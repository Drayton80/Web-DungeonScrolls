from django.urls import path, include
from .views import SettingsPage

urlpatterns = [
    path('settings-page/', SettingsPage.as_view(), name='settings_page'),
]
