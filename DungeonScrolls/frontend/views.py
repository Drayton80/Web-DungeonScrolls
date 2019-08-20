from django.shortcuts import render


def index(request):
    context = {'test': 'Armando é um Trouxa'}
    return render(request, 'frontend/index.html', context)
