from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.utils.text import slugify
from shortuuid.django_fields import ShortUUIDField
import shortuuid
from django.contrib.auth.models import User
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
    
    exercise = models.CharField(max_length=255)
    type = models.CharField(max_length=255, choices=TYPE, default='Strength')
    
    def __str__(self):
        return self.exercise
    
    def strength_exercise_count(self):
        return Strength.objects.filter(exercise=self).count()
    
    def cardio_exercise_count(self):
        return Cardiovascular.objects.filter(exercise=self).count()
    
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



class Course(models.Model):
    title = models.CharField(max_length=255)  # Course title
    duration = models.CharField(max_length=50)  # Duration of the course
    price = models.DecimalField(max_digits=6, decimal_places=2)  # Price of the course
    youtube_id = models.CharField(max_length=50, unique=True)  # YouTube video ID
    description = models.TextField()  # Description of the course
    body_focus = models.CharField(max_length=50)  # e.g., "Upper Body"
    training_type = models.CharField(max_length=50)  # e.g., "Strength"
    equipment = models.CharField(max_length=50)  # e.g., "Dumbbell"
    specialty_program = models.CharField(max_length=100)  # e.g., "5 Day Trainer Series"
    users = models.ManyToManyField(User, related_name="purchased_courses", blank=True)

    def __str__(self):
        return self.title