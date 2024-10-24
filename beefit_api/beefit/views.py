from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout

# Create your views here.

"""
Register a new user through a web form.

This view handles the registration process for new users. It processes the form submission, validates the input, and logs in the user upon successful registration, or displays the registration form if the request method is not POST.

Args:
    request: The HTTP request object containing the form data.

Returns:
    HttpResponse: A response object that either redirects to the login page or renders the registration form.

Examples:
    To register a user, send a POST request with the necessary user data.
"""
def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            login(request, form.save())
            return redirect("beefit:login")
    else:   
        form = UserCreationForm()
        
    return render(request, 'users/register.html', { 'form': form })

"""
Handle user login through a web form.

This view processes the login form submission, validates the user's credentials, and logs in the user upon successful authentication. If the request method is not POST, it displays the login form for the user to fill out.

Args:
    request: The HTTP request object containing the form data.

Returns:
    HttpResponse: A response object that either redirects to the home page or renders the login form.

Examples:
    To log in a user, send a POST request with the user's credentials.
"""
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect('/')
    else:
        form = AuthenticationForm()
    
    return render(request, 'users/login.html', { 'form': form })

"""
Handle user logout.

This view processes a logout request and logs the user out of the application when a POST request is made. Upon successful logout, it redirects the user to the home page.

Args:
    request: The HTTP request object.

Returns:
    HttpResponse: A response object that redirects to the home page after logout.

Examples:
    To log out a user, send a POST request to this view.
"""
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('/')
    