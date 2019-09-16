from django.urls import include, path
from rest_framework import routers
from . import views


#router = routers.DefaultRouter()
# router.register('api/getUser/<int:pk>/', views.UserDetail.as_view(), 'GetUser') isso é só pra viewsets

urlpatterns = [
     path('api/getUser/', views.UserDetail.as_view()),
     path('api/getUser/<int:pk>/', views.UserDetail.as_view(), name='GetUser'),
     path('api/getRuleSystem/<int:rule_system_id>/',
          views.RuleSystemDetail.as_view(), name='GetRuleSystem'),
     path('api/getBestiaryList/<int:user_id>/',
          views.BestiaryList.as_view(), name='GetBestiaryList'),
     path('api/getChapterList/<int:bestiary_id>/',
          views.ChapterList.as_view(), name='GetChapterList'),
     path('api/getSheetList/<int:chapter_id>/',
         views.SheetList.as_view(), name='GetSheetList'),
     path('api/getSheetDnD35/<int:sheet_id>/',
         views.SheetDnD35Detail.as_view(), name='GetSheetDnD35'),
]
