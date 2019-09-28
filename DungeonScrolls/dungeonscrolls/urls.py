from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from .views import index


urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', index, name='home_page'),
    path('', include('frontend.urls')),
    path('calculator/', include('calculator.urls')),
    path('sheets/', include('sheets.urls')),
    path('rest/', include('rest.urls')),
    url(r'^accounts/', include('registration.backends.default.urls'))
    #path('accounts/', include('accounts.urls'))
]
