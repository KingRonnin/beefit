from django.urls import path
from . import views

app_name =  'beefit'

urlpatterns = [
    path('register/', views.register_view, name="register"),
]