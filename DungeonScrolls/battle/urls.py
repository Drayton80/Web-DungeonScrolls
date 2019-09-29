from django.urls import path, include
from .views import battle_initiative


urlpatterns = [
    path('battle-initiative/', battle_initiative, name='battle_initiative'),
]