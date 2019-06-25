from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm

def registration(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('/accounts')
    
    else: 
        args = {'form': UserCreationForm()}

        return render(request, 'frontend/registration.html', args)
