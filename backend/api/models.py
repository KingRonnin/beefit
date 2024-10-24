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
    exercise = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, null=True, blank=True)
    
    def __str__(self):
        return self.exercise
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug is None:
            self.slug = self.exercise
        super(Exercise, self).save(*args, **kwargs)
        
    def strength_exercise_count(self):
        return Strength.objects.filter(exercise=self).count()
    
    def cardio_exercise_count(self):
        return Cardiovascular.objects.filter(category=self).count()
    
class Strength(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.SET_NULL, null=True, related_name='strength_exercises')
    set = models.PositiveIntegerField(default=0)
    rep = models.PositiveIntegerField(default=0)
    weight = models.PositiveIntegerField(default=0)
    slug = models.SlugField(unique=True, null=True, blank=True)
    
    def __str__(self):
        return self.exercise
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug is None:
            self.slug = f"{slugify(self.exercise)}-{shortuuid.uuid()[:2]}"
        super(Strength, self).save(*args, **kwargs)
    
class Cardiovascular(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.SET_NULL, null=True, related_name='cardiovascular_exercises')
    step = models.PositiveIntegerField(default=0)
    time = models.PositiveIntegerField(default=0)
    calories_burnt = models.PositiveIntegerField(default=0)
    slug = models.SlugField(unique=True, null=True, blank=True)
    
    def __str__(self):
        return self.exercise
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug is None:
            self.slug = f"{slugify(self.exercise)}-{shortuuid.uuid()[:2]}"
        super(Cardiovascular, self).save(*args, **kwargs)

