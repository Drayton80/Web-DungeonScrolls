from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from .views import index


urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', index, name='home'),
    path('', include('frontend.urls')),
    path('calculator/', include('calculator.urls')),
    url(r'^accounts/', include('registration.backends.default.urls'))
    #path('accounts/', include('accounts.urls'))
]
