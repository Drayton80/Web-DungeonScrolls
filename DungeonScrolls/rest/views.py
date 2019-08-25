from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.http import Http404, HttpResponse, JsonResponse
from .serializer import UserSerializer
import json

class UserDetail(APIView):    
    
    def get_object(self, pk, format=None):
        try:
            print(pk)
            user = User.objects.get(pk=pk)
            user_serializer = UserSerializer(user, many=False)                 
            return  JsonResponse(user_serializer.data, safe=False)
        except User.DoesNotExist:            
            raise Http404
                
    def get(self, request, pk, format=None):
       return self.get_object(pk)


