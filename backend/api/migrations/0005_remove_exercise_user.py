# Generated by Django 4.2 on 2024-11-06 01:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_exercise_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercise',
            name='user',
        ),
    ]
