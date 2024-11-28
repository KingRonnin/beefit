# Generated by Django 4.2 on 2024-11-28 04:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_exercise_user_cardiovascular_user_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gym',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=255, unique=True)),
                ('facility', models.CharField(max_length=255)),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
            ],
        ),
        migrations.AlterField(
            model_name='exercise',
            name='exercise',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]