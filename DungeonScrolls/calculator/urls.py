from django.urls import path, include
from .views import ExperienceCalculatorView

urlpatterns = [
    path('experience-points', ExperienceCalculatorView.as_view(), name='experience_points'),
]