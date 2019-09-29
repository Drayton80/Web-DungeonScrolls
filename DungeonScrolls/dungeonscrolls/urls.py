from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from .views import index


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='home_page'),
    path('home/', index),
    path('bestiary/', include('frontend.urls')),
    path('calculator/', include('calculator.urls')),
    path('battle/', include('battle.urls')),
    path('sheets/', include('sheets.urls')),
    path('rest/', include('rest.urls')),
    url(r'^accounts/', include('registration.backends.simple.urls'))
    #path('accounts/', include('accounts.urls'))
]
