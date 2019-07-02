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
            response_data = json.dumps({'useless': 12})
            return HttpResponse(response_data, content_type='application/json') 
    
    else: 
        args = {'form': RegistrationForm()}

        return render(request, 'frontend/registration.html', args)
