from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required(login_url='beefit/login')
def homepage (request):
    return render(request, 'homepage.html')