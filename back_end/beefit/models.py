from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=30)

class DailyLog(models.Model):
    date = models.DateField()
    calories_intake = models.IntegerField()
    calories_burnt = models.IntegerField()
    steps = models.IntegerField()    