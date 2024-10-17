from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here
"""
Render the homepage for authenticated users.

This view displays the homepage of the application, ensuring that only users who are logged in can access it. If a user is not authenticated, they will be redirected to the specified login page.

Args:
    request: The HTTP request object.

Returns:
    HttpResponse: A response object that renders the 'homepage.html' template.

Examples:
    Users must be logged in to access this view; otherwise, they will be redirected to the login page.
"""
@login_required(login_url='beefit/login')
def homepage (request):
    return render(request, 'homepage.html')