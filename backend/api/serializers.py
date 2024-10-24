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
        models = api_models.User
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
        
        user.set_password(validate_password['password'])
        user.save()
        
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.User
        fields = "__all__"
        
class ExerciseSerializer(serializers.ModelSerializer):
    def get_strength_exercise_count(self, exercise):
        return exercise.strengths.count()
    def get_cardio_exercise_count(self, exercise):
        return exercise.cardios.count()
    
    class Meta:
        model = api_models.Exercise
        fields = "__all__"

class StrengthSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Strength
        fields = "__all__"
        
class CardiovascularSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Cardiovascular
        fields = "__all__"