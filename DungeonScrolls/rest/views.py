from django.shortcuts import render
from django.contrib.auth.models import User
from rule_system.models import RuleSystem
from sheets.models import Bestiary, Chapter, Sheet, SheetDnD35
from rest_framework.views import APIView
from django.http import Http404, HttpResponse, JsonResponse
from .serializer import UserSerializer, BestiarySerializer, ChapterSerializer, SheetListSerializer, RuleSystemSerializer, SheetDnD35Serializer
import json


class UserDetail(APIView):

    def get(self, request, pk, format=None):
        return self.get_object(pk)
    
    def get_object(self, pk, format=None):
        try:
            user = User.objects.get(pk=pk)
            user_serializer = UserSerializer(user, many=False)

            return JsonResponse(user_serializer.data, safe=False)
        except User.DoesNotExist:
            raise Http404


class RuleSystemDetail(APIView):

    def get(self, request, rule_system_id, format=None):
        return self.get_object(rule_system_id)
    
    def get_object(self, rule_system_id, format=None):
        try:
            rule_system = RuleSystem.objects.get(pk=rule_system_id)
            rule_system_serializer = RuleSystemSerializer(rule_system, many=False)

            return JsonResponse(rule_system_serializer.data, safe=False)

        except RuleSystem.DoesNotExist:
            raise Http404


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

# Dentro de um bestiário pode haver fichas pertencentes a sistemas distintos
# então essa rota retorna todas as instâncias do model Sheet (pai de qualquer
# outra Sheet mais específica, como DnD35, DnD3E, Tormenta, etc)
class SheetList(APIView):

    def get_object(self, chapter_id, format=None):
        try:
            chapter = Chapter.objects.get(pk=chapter_id)
            sheet_list = chapter.sheet_set.all()
            sheet_serializer = SheetListSerializer(sheet_list, many=True) 

            return JsonResponse(sheet_serializer.data, safe=False)
        except Chapter.DoesNotExist:
            raise Http404

    def get(self, request, chapter_id, format=None):
        return self.get_object(chapter_id)

# Quando uma ficha em especifico por pega, é necessário que seja especifica
# ao sistema que ela está atrelada
class SheetDnD35Detail(APIView):

    def get_object(self, sheet_id, format=None):
        try:
            sheet = SheetDnD35.objects.get(pk=sheet_id)
            sheet_serializer = SheetDnD35Serializer(sheet, many=False)

            return JsonResponse(sheet_serializer.data, safe=False)

        except SheetDnD35.DoesNotExist:
            raise Http404

    def get(self, request, sheet_id, format=None):
        return self.get_object(sheet_id)