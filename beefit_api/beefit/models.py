from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return super().__str__()