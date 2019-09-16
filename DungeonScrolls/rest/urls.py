from django.urls import include, path
from rest_framework import routers
from . import views


#router = routers.DefaultRouter()
# router.register('api/getUser/<int:pk>/', views.UserDetail.as_view(), 'GetUser') isso é só pra viewsets

urlpatterns = [
    path('api/getUser/', views.UserDetail.as_view()),
    path('api/getUser/<int:pk>/', views.UserDetail.as_view(), name='GetUser'),
    path('api/getBestiaryList/<int:user_id>/',
         views.BestiaryList.as_view(), name='GetBestiaryList'),
    path('api/getChapterList/<int:bestiary_id>/',
         views.ChapterList.as_view(), name='GetChapterList'),
]
