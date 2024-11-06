# Generated by Django 4.2 on 2024-10-31 07:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_exercise_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercise',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='user',
        ),
        migrations.AddField(
            model_name='cardiovascular',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='strength',
            name='date',
            field=models.DateField(blank=True, null=True),
        ),
    ]