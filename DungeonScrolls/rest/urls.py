from django.urls import include, path
from rest_framework import routers
from . import views


#router = routers.DefaultRouter()
#router.register('api/getUser/<int:pk>/', views.UserDetail.as_view(), 'GetUser') isso é só pra viewsets

urlpatterns = [
    path('api/getUser/', views.UserDetail.as_view()),
    path('api/getUser/<int:pk>/', views.UserDetail.as_view(), name='GetUser'),
]
