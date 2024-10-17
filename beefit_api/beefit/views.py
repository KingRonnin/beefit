from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm

# Create your views here.
def register_view(request):
    if request.POST == 'POST':  
        form = UserCreationForm()  
        if form.is_valid():  
            form.save()  
    messages.success(request, 'Account created successfully')  
    else:  
        form = UserCreationForm() 
    
    context = {  
        'form':form  
    }
    return render(request, 'users/register.html', context)
