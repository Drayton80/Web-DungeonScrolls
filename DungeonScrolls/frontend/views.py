from django.shortcuts import render
from django.contrib.auth.models import User


def index(request):
    username = None
    if request.user.is_authenticated:
        username = request.user.id
    context = {'test': 'Armando é um Trouxa',
                'User': username }
    return render(request, 'frontend/index.html', context)
