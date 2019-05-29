from django.shortcuts import render


def experience_points(request):
    context ={}

    return render(request, 'calculator/experience_points.html')
