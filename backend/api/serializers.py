from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from api import models as api_models

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        token['email'] = user.email
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    # Provides extra instructors or settings to your class
    # Tells the class that it is associated to the User class inside models.py
    class Meta:
        model = api_models.User
        fields = ['email', 'password', 'password2']
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password didn't match"})
        
        return attrs
    
    def create(self, validated_data):
        user = api_models.User.objects.create(
            email = validated_data['email']
        )
        
        email_username, mobile = user.email.split("@")
        user.username = email_username
        
        user.set_password(validated_data['password'])
        user.save()
        
        return user
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.User
        fields = "__all__"
        
class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Exercise
        fields = "__all__"

class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Gym
        fields = "__all__"

class StrengthSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Strength
        fields = "__all__"
    
    def __init__(self, *args, **kwargs):
        super(StrengthSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0 if request and request.method == "POST" else 1
        
class CardiovascularSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Cardiovascular
        fields = "__all__"
    
    def __init__(self, *args, **kwargs):
        super(CardiovascularSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0 if request and request.method == "POST" else 1

class UserExerciseSerializer(serializers.Serializer):
    # Strength
    sets = serializers.IntegerField(default=0)
    reps = serializers.IntegerField(default=0)
    weight = serializers.IntegerField(default=0)
    strength_exercises = serializers.IntegerField(default=0)
    
    # Cardio
    steps = serializers.IntegerField(default=0)
    duration_mins = serializers.IntegerField(default=0)
    cardio_exercises = serializers.IntegerField(default=0)

class UserStrengthSerializer(serializers.Serializer):
    # Strength
    total_volume_load = serializers.IntegerField()
    average_workload_per_rep = serializers.FloatField()
    max_weight = serializers.IntegerField(default=0)
    
    # Date
    date = serializers.DateField(format='%Y-%m-%d')
    
    class Meta:
        model = None
        fields = ('total_volume_load', 'average_workload_per_rep', 'max_weight', 'date')

class UserCardiovascularSerializer(serializers.Serializer):
    # Cardiovascular
    total_steps = serializers.IntegerField(default=0)
    steps_per_minute = serializers.FloatField()
    duration = serializers.IntegerField(default=0)
    
    # Date
    date = serializers.DateField(format='%Y-%m-%d')
    
    class Meta:
        model = None
        fields = ('total_steps', 'steps_per_minute', 'duration', 'date')