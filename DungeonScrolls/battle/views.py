from django.shortcuts import render


def battle_initiative(request):
    return render(request, 'battle/battle_initiative.html')

