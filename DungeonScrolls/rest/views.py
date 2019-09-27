from django.shortcuts import render
from django.contrib.auth.models import User
from rule_system.models import RuleSystem
from sheets.models import Bestiary, Chapter, Sheet, SheetDnD35
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import Http404, HttpResponse, JsonResponse
from .serializer import UserSerializer, BestiarySerializer, ChapterSerializer, SheetListSerializer, RuleSystemSerializer, SheetDnD35Serializer
import json
import datetime


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
    # Obtain a List of Bestiaries:
    def get(self, request, user_id, format=None):
        try:
            bestiary_list = Bestiary.objects.filter(owner=user_id)
            serializer = BestiarySerializer(bestiary_list, many=True)

            return Response(serializer.data)
        except Bestiary.DoesNotExist:
            raise Http404
    
    # Create Bestiary:
    def post(self, request):
        serializer = BestiarySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creation_date=datetime.date.today())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BestiaryDetail(APIView):
    # Get an Instance of a Bestiary based on it's primary key:
    def get_object(self, pk):
        try:
            return Bestiary.objects.get(pk=pk)
        except Bestiary.DoesNotExist:
            raise Http404
    
    # Update a Bestiary:
    def put(self, request, pk):
        bestiary = self.get_object(pk)
        serializer = BestiarySerializer(bestiary, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete a Bestiary:
    def delete(self, request, pk):
        bestiary = self.get_object(pk)
        bestiary.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class ChapterList(APIView):
    # Obtain a List of Chapters:
    def get(self, request, bestiary_id, format=None):
        try:
            bestiary = Bestiary.objects.get(pk=bestiary_id)
            chapter_list = bestiary.chapter_set.all()
            serializer = ChapterSerializer(chapter_list, many=True)

            return Response(serializer.data)
        except Bestiary.DoesNotExist:
            raise Http404

    # Create Chapter:
    def post(self, request):
        serializer = ChapterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChapterDetail(APIView):
    # Get an Instance of a Chapter based on it's primary key:
    def get_object(self, pk):
        try:
            return Chapter.objects.get(pk=pk)
        except Chapter.DoesNotExist:
            raise Http404
    
    # Update a Chapter:
    def put(self, request, pk):
        chapter = self.get_object(pk)
        serializer = BestiarySerializer(chapter, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete a Chapter:
    def delete(self, request, pk):
        chapter = self.get_object(pk)
        chapter.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


# Dentro de um bestiário pode haver fichas pertencentes a sistemas distintos
# então essa rota retorna todas as instâncias do model Sheet (pai de qualquer
# outra Sheet mais específica, como DnD35, DnD3E, Tormenta, etc)
class SheetList(APIView):
    def get(self, request, chapter_id, format=None):
        try:
            chapter = Chapter.objects.get(pk=chapter_id)
            sheet_list = chapter.sheet_set.all()
            serializer = SheetListSerializer(sheet_list, many=True) 

            return Response(serializer.data)
        except Chapter.DoesNotExist:
            raise Http404


class SheetListFromUserThatEdit(APIView):
    def get(self, request, user_that_edit_id):
        try:
            sheet_list = Sheet.objects.filter(users_that_edit__id=user_that_edit_id)
            serializer = SheetListSerializer(sheet_list, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            raise Http404


# Quando uma ficha em especifico por pega, é necessário que seja especifica
# ao sistema que ela está atrelada
class SheetDnD35Detail(APIView):
    # Get an Instance of a D&D 3.5 Sheet based on it's primary key:
    def get_object(self, pk):
        try:
            return SheetDnD35.objects.get(pk=pk)
        except SheetDnD35.DoesNotExist:
            raise Http404
    
    # Get a D&D 3.5 Sheet:
    def get(self, request, pk):
        sheet = self.get_object(pk)
        serializer = SheetDnD35Serializer(sheet, many=False)

        return Response(serializer.data)

    # Create a D&D 3.5 Sheet:
    def post(self, request):
        serializer = SheetDnD35Serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Update a D&D 3.5 Sheet:
    def put(self, request, pk):
        sheet = self.get_object(pk)
        serializer = BestiarySerializer(sheet, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete a D&D 3.5 Sheet:
    def delete(self, request, pk):
        sheet = self.get_object(pk)
        sheet.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)