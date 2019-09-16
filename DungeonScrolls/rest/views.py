from django.shortcuts import render
from django.contrib.auth.models import User
from sheets.models import Bestiary, Chapter, SheetDnD35
from rest_framework.views import APIView
from django.http import Http404, HttpResponse, JsonResponse
from .serializer import UserSerializer, BestiarySerializer, ChapterSerializer
import json


class UserDetail(APIView):

    def get_object(self, pk, format=None):
        try:
            print(pk)
            user = User.objects.get(pk=pk)
            user_serializer = UserSerializer(user, many=False)
            return JsonResponse(user_serializer.data, safe=False)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        return self.get_object(pk)


class SheetDetail(APIView):

    def get_object(self, pk, format=None):
        try:
            print(pk)
            user = User.objects.get(pk=pk)
            user_serializer = UserSerializer(user, many=False)
            return JsonResponse(user_serializer.data, safe=False)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        return self.get_object(pk)


class SheetList(APIView):

    def get_object(self, pk, format=None):
        try:
            print(pk)
            user = User.objects.get(pk=pk)
            user_serializer = UserSerializer(user, many=False)
            return JsonResponse(user_serializer.data, safe=False)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        return self.get_object(pk)


class ChapterList(APIView):

    def get_object(self, bestiary_id, format=None):
        try:
            bestiary = Bestiary.objects.get(pk=bestiary_id)
            chapter_list = bestiary.chapter_set.all()
            chapter_serializer = ChapterSerializer(chapter_list, many=True)

            return JsonResponse(chapter_serializer.data, safe=False)
        except Bestiary.DoesNotExist:
            raise Http404

    def get(self, request, bestiary_id, format=None):
        return self.get_object(bestiary_id)


class BestiaryList(APIView):

    def get_object(self, user_id, format=None):
        try:
            bestiary_list = Bestiary.objects.filter(owner=user_id)
            bestiary_serializer = BestiarySerializer(bestiary_list, many=True)

            return JsonResponse(bestiary_serializer.data, safe=False)
        except Bestiary.DoesNotExist:
            raise Http404

    def get(self, request, user_id, format=None):
        return self.get_object(user_id)
