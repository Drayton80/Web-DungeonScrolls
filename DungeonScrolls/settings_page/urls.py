from django.urls import path, include
from .views import settings_page


urlpatterns = [
    path('settings-page/', settings_page, name='settings_page'),
]