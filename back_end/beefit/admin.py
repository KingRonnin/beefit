from django.contrib import admin
from .models import Exercise, DailyLog

class DailyLogAdmin(admin.ModelAdmin):
    list_display = ('date', 'calories_intake', 'calories_burnt', 'steps')

class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('name',)

# Register your models here.

admin.site.register(DailyLog, DailyLogAdmin)

admin.site.register(Exercise, ExerciseAdmin)