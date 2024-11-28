from django.shortcuts import render
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.db.models import Sum, Max, F
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, BasePermission, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt

import resend
import stripe
import json
import random

from api import serializers as api_serializers
from api import models as api_models

# Keys
stripe.api_key = settings.STRIPE_SECRET_KEY

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializers.MyTokenObtainPairSerializer
    
class RegisterView(generics.CreateAPIView):
    queryset = api_models.User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = api_serializers.RegisterSerializer

class ExerciseListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.ExerciseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return api_models.Exercise.objects.all()

class GymListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.GymSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return api_models.Gym.objects.all()

class StrengthListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.StrengthSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return api_models.Strength.objects.filter(exercise__type__exact='Strength')

class CardiovascularListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.CardiovascularSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return api_models.Cardiovascular.objects.filter(exercise__type__exact='Cardiovascular')

class UserExerciseView(generics.ListAPIView):
    serializer_class = api_serializers.UserExerciseSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = api_models.User.objects.get(id=user_id)
        
        sets = api_models.Strength.objects.filter(exercise__user=user).aggregate(total_sets = Sum("set"))['total_sets']
        reps = api_models.Strength.objects.filter(exercise__user=user).aggregate(total_reps = Sum("rep"))['total_reps']
        weight = api_models.Strength.objects.filter(exercise__user=user).aggregate(personal_best_weight = Max("weight"))['personal_best_weight']
        strength_exercises = api_models.Strength.objects.filter(exercise__user=user).count()
        steps = api_models.Cardiovascular.objects.filter(exercise__user=user).aggregate(total_steps = Sum("step"))['total_steps']
        time_minutes = api_models.Cardiovascular.objects.filter(exercise__user=user).aggregate(personal_best_time = Max("time"))['personal_best_time']
        cardio_exercises = api_models.Cardiovascular.objects.filter(exercise__user=user).count()

        return [{
            "sets": sets,
            "reps": reps,
            "weight": weight,
            "strength_exercises": strength_exercises,
            "steps": steps,
            "time_minutes": time_minutes,
            "cardio_exercises": cardio_exercises,
        }]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many = True)
        return Response(serializer.data)
    
class UserStrengthExerciseView(generics.ListAPIView):
    serializer_class = api_serializers.UserStrengthSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = api_models.User.objects.get(id=user_id)
        
        total_volume = Sum(F("set") * F('rep') * F("weight"))
        total_rep = Sum('rep')

        return (
            api_models.Strength.objects.filter(user=user) \
            .values('date') \
            .annotate(
                total_volume_load=Sum("set") * Sum("rep") * Sum("weight"),
                average_workload_per_rep=total_volume / total_rep,
                max_weight=Max("weight"),
            ) \
            .order_by('date')
        )
        
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        cumulative_values = {}

        for item in queryset:
            date = item['date']
            if date not in cumulative_values:
                cumulative_values[date] = {
                    'total_volume_load': 0,
                    'average_workload_per_rep': 0,
                    'max_weight': 0,
                }
            cumulative_values[date]['total_volume_load'] += item['total_volume_load']
            cumulative_values[date]['average_workload_per_rep'] += item['average_workload_per_rep']
            cumulative_values[date]['max_weight'] += item['max_weight']

        incremented_data = [
            {
                'date': date,
                'total_volume_load': values['total_volume_load'],
                'average_workload_per_rep': values['average_workload_per_rep'],
                'max_weight': values['max_weight'],
            }
            for date, values in cumulative_values.items()
        ]
        serializer = self.serializer_class(incremented_data, many = True)
        return Response(serializer.data)

class UserCardiovascularExerciseView(generics.ListAPIView):
    serializer_class = api_serializers.UserCardiovascularSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = api_models.User.objects.get(id=user_id)
        
        total_steps = Sum('step')
        duration = Sum('time')
        
        return (
            api_models.Cardiovascular.objects.filter(user=user) \
            .values('date') \
            .annotate(
                total_steps=Sum('step', default=0),
                steps_per_minute=total_steps / duration,
                duration=Sum('time', default=0),
            ) \
            .order_by('date')
        )
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        cumulative_values = {}
        
        for item in queryset:
            date = item['date']
            if date not in cumulative_values:
                cumulative_values[date] = {
                    'total_steps': 0,
                    'steps_per_minute': 0,
                    'duration': 0,
                }
            cumulative_values[date]['total_steps'] += item['total_steps']
            cumulative_values[date]['steps_per_minute'] += item['steps_per_minute']
            cumulative_values[date]['duration'] += item['duration']
        
        incremented_data = [
            {
                'date': date,
                'total_steps': values['total_steps'],
                'steps_per_minute': values['steps_per_minute'],
                'duration': values['duration'],
            }
            for date, values, in cumulative_values.items()
        ]
        serializer = self.serializer_class(incremented_data, many = True)
        return Response(serializer.data)

class LogStrengthView(generics.CreateAPIView):
    serializer_class = api_serializers.StrengthSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        print(request.data)
        exercise_id = request.data.get('exercise_id')
        user_id = request.data.get('user_id')
        set = request.data.get('set')
        rep = request.data.get('rep')
        weight = request.data.get('weight')
        date = request.data.get('date')
        
        exercise = api_models.Exercise.objects.get(id=exercise_id)
        user = api_models.User.objects.get(id=user_id)
        
        strength_exercise = api_models.Strength.objects.create(
            exercise=exercise,
            user=user,
            set=set,
            rep=rep,
            weight=weight,
            date=date
        )
        
        return Response({"message":"Workout Logged"}, status=status.HTTP_201_CREATED)
    
class LogCardioView(generics.CreateAPIView):
    serializer_class = api_serializers.CardiovascularSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        print(request.data)
        exercise_id = request.data.get('exercise_id')
        user_id = request.data.get('user_id')
        step = request.data.get('step')
        time = request.data.get('time')
        date = request.data.get('date')
        
        print(exercise_id)
        print(step)
        print(time)
        print(date)
        
        exercise = api_models.Exercise.objects.get(id=exercise_id)
        user = api_models.User.objects.get(id=user_id)
        
        strength_exercise = api_models.Cardiovascular.objects.create(
            exercise=exercise,
            user=user,
            step=step,
            time=time,
            date=date
        )
        
        return Response({"message":"Workout Logged"}, status=status.HTTP_201_CREATED)
    
@csrf_exempt
def create_payment_intent(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
    try:
        data = json.loads(request.body)
        amount = int(float(data['amount']) * 100)  # Convert dollars to cents
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return JsonResponse({'client_secret': intent.client_secret})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    
@csrf_exempt
def create_checkout_session(req):
    data = json.loads(req.body)
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
                'price_data': {
                'currency': 'cad',
                'product_data': {
                    'name': data['name'],
                },
                'unit_amount': int(float(data['amount']) * 100),  # Amount in cents
            },
            'quantity': 1,
        }],
        mode='payment',
        success_url='http://localhost:5173/success',
        cancel_url='http://localhost:5173/',
    )
    return JsonResponse({'id': session.id})

@csrf_exempt
def contact(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            message = data.get('message')


            subject = f"Message from {name} ({email})"
            body = f"Message:\n{message}"

            r = resend.Emails.send({
                "from": "onboarding@resend.dev",
                "to": "kaurrajinder17082004@gmail.com",
                "subject": subject,
                "html": f"<p>{message}!</p>"
            })

            # send_mail(
            #     subject,
            #     body,
            #     settings.EMAIL_HOST_USER,
            #     [email],  # To email
            # )
            return JsonResponse({'success': True, 'message': 'Email sent successfully'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request'}, status=400)