from django.urls import include, path
from rest_framework import routers
from . import views


#router = routers.DefaultRouter()
# router.register('api/getUser/<int:pk>/', views.UserDetail.as_view(), 'GetUser') isso é só pra viewsets

urlpatterns = [
     path('api/user/from-user-name/<str:username>/', views.UserDetailFromUsername.as_view()),
     path('api/bestiary/', views.BestiaryList.as_view()),
     path('api/bestiary/<int:pk>/', views.BestiaryDetail.as_view()),
     path('api/chapter/', views.ChapterList.as_view()),
     path('api/chapter/<int:pk>/', views.ChapterDetail.as_view()),
     path('api/sheet-list/<int:chapter_id>/', views.SheetList.as_view()),
     path('api/sheet-list/from-users-that-edit/<int:user_that_edit_id>/', views.SheetListFromUserThatEdit.as_view()),
     path('api/sheet-dnd35/create/', views.SheetDnD35Detail.as_view()),
     path('api/sheet-dnd35/<int:pk>/', views.SheetDnD35Detail.as_view()),

     path('api/get-user/', views.UserDetail.as_view()),
     path('api/get-user/<int:pk>/', views.UserDetail.as_view(), name='GetUser'),
     path('api/get-rule-system/<int:rule_system_id>/',
          views.RuleSystemDetail.as_view(), name='GetRuleSystem'),
     path('api/get-bestiary-list/<int:user_id>/',
          views.BestiaryList.as_view(), name='GetBestiaryList'),
     path('api/get-chapter-list/<int:bestiary_id>/',
          views.ChapterList.as_view(), name='GetChapterList'),
     path('api/get-sheet-list/<int:chapter_id>/',
         views.SheetList.as_view(), name='GetSheetList'),
     path('api/get-sheet-dnd35/<int:pk>/',
         views.SheetDnD35Detail.as_view(), name='GetSheetDnD35'),
]
