from django.urls import path, include
from .views import registration

urlpatterns = [
    path('registration', registration, name='registration'),
]