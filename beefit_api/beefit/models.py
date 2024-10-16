from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=25)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=25)
    created_date = models.DateTimeField(auto_now_add=True)
    

