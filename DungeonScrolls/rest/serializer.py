from rest_framework import serializers
from django.contrib.auth.models import User
from sheets.models import Bestiary, Chapter


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class BestiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bestiary
        fields = '__all__'


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'
