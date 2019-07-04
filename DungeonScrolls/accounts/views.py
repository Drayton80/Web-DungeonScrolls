from django.shortcuts import render, redirect
from accounts.forms import RegistrationForm
from django.http import HttpResponse

import json

def registration(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('/calculator/experience-points')
    
    else: 
        form = RegistrationForm()

    return render(request, 'frontend/base.html', {'form': form})
