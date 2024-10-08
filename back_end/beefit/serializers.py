from rest_framework import serializers
from .models import Exercise, DailyLog

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id', 'name')
        
class DailyLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyLog
        fields = ('id', 'date', 'calories_intake', 'calories_burnt', 'steps')