from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ExerciseSerializer, DailyLogSerializer
from .models import Exercise, DailyLog

# Create your views here.

class ExerciseView(viewsets.ModelViewSet):
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()

class DailyLogView(viewsets.ModelViewSet):
    serializer_class = DailyLogSerializer
    queryset = DailyLog.objects.all()