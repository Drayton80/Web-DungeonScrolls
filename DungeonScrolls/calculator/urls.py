from django.urls import path, include
from . import views

urlpatterns = [
    path('experience-points', views.experience_points, name='experience_points'),
]