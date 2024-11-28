from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.utils.text import slugify
from shortuuid.django_fields import ShortUUIDField
import shortuuid

# Create your models here.
class User(AbstractUser):
    username = models.CharField(unique=True, max_length=30)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        email_username, mobile = self.email.split("@")
        if self.username == "" or self.username is None:
            self.username = email_username
        
        super(User, self).save(*args, **kwargs)
        
class Exercise(models.Model):
    TYPE = (
        ('Strength', 'Strength'),
        ('Cardiovascular', 'Cardiovascular')
    )
    
    exercise = models.CharField(max_length=255, unique=True)
    type = models.CharField(max_length=255, choices=TYPE, default='Strength')
    
    def __str__(self):
        return self.exercise
    
class Gym(models.Model):
    address = models.CharField(max_length=255, unique=True)
    facility = models.CharField(max_length=255)
    longitude = models.FloatField()
    latitude = models.FloatField()
    
    def __str__(self):
        return self.address
    
class Strength(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, null=True, related_name='strength_exercise')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    set = models.PositiveIntegerField(default=0)
    rep = models.PositiveIntegerField(default=0)
    weight = models.PositiveIntegerField(default=0)
    date = models.DateField(blank=True, null=True)
    
    def __str__(self):
        return self.exercise.exercise
    
class Cardiovascular(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, null=True, related_name='cardiovascular_exercise')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1, null=True)
    step = models.PositiveIntegerField(default=0)
    time = models.PositiveIntegerField(default=0)
    date = models.DateField(blank=True, null=True)
    
    def __str__(self):
        return self.exercise.exercise

