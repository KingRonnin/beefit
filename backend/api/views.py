from django.shortcuts import render
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.db.models import Sum, Max
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
import stripe

import json
import random

from api import serializers as api_serializers
from api import models as api_models

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
    
<<<<<<< HEAD
class UserStrengthExerciseView(generics.ListAPIView):
    serializer_class = api_serializers.UserStrengthSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = api_models.User.objects.get(id=user_id)

        return (
            api_models.Strength.objects.filter(exercise__user=user) \
            .values('date') \
            .annotate(
                total_sets=Sum("set"),
                total_reps=Sum("rep"),
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
                    'sets': 0,
                    'reps': 0,
                    'weight': 0,
                }
            cumulative_values[date]['sets'] += item['total_sets']
            cumulative_values[date]['reps'] += item['total_reps']
            cumulative_values[date]['weight'] += item['max_weight']

        incremented_data = [
            {
                'date': date,
                'sets': values['sets'],
                'reps': values['reps'],
                'weight': values['weight'],
            }
            for date, values in cumulative_values.items()
        ]
        serializer = self.serializer_class(incremented_data, many = True)
        return Response(serializer.data)
    
class UserCardiovascularView(generics.ListAPIView):
    serializer_class = api_serializers.UserCardiovascularSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = api_models.User.objects.get(id=user_id)

        queryset = api_models.Cardiovascular.objects.filter(exercise__user=user) \
            .annotate(total_steps=Sum("step"), total_duration=Sum("time")) \
            .order_by('-date')

        data = [
            {
                "steps": item.total_steps,
                "time": item.total_duration,
                "date": item.date.strftime('%Y-%m-%d')
            }
            for item in queryset
        ]

        return data
        
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many = True)
        return Response(serializer.data)

class LogStrengthView(generics.CreateAPIView):
    serializer_class = api_serializers.StrengthSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        print(request.data)
        exercise_id = request.data.get('exercise_id')
        set = request.data.get('set')
        rep = request.data.get('rep')
        weight = request.data.get('weight')
        date = request.data.get('date')
        
        exercise = api_models.Exercise.objects.get(id=exercise_id)
        
        strength_exercise = api_models.Strength.objects.create(
            exercise=exercise,
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
        step = request.data.get('step')
        time = request.data.get('time')
        date = request.data.get('date')
        
        print(exercise_id)
        print(step)
        print(time)
        print(date)
        
        exercise = api_models.Exercise.objects.get(id=exercise_id)
        
        strength_exercise = api_models.Cardiovascular.objects.create(
            exercise=exercise,
            step=step,
            time=time,
            date=date
        )
        
        return Response({"message":"Workout Logged"}, status=status.HTTP_201_CREATED)
=======

@csrf_exempt
def create_payment_intent(request):
    if request.method == 'POST':
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
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
    
@csrf_exempt
def create_checkout_session(req):
    data = json.loads(req.body)
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
                'price_data': {
                'currency': 'usd',
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
>>>>>>> 2512d12794a0950081126b35a68378f2036b59f7
