from django.shortcuts import render, HttpResponse


def experience_points(request):
    return render(request, 'calculator/experience_points.html')
