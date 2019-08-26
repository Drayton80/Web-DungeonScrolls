import datetime

from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Chapter, Bestiary, SheetDnD35
from rule_system.models import RuleSystem

def test(request):
    owner = User.objects.filter(username='drayton').first()
    bestiary = Bestiary.objects.filter(name='Test').first() 
    #Bestiary(name='Test', creation_date=datetime.datetime.now(), owner=owner)
    #bestiary.save()
    chapter = Chapter.objects.filter(name='Chapter N').first()
    #chapter = Chapter(name='Chapter N', description='', bestiary=bestiary)
    #chapter.save()
    sheet = SheetDnD35(name='Sheet Test 2', sheet_type='CR', chapter=chapter)
    sheet.save()
    sheet = SheetDnD35.objects.filter(name='Sheet Test 2').first()
    #sheet.ability_dexterity_modifier = -1
    #sheet.save()
    sheet.field_text_list_talents_skills_add('Stealth', True, 'DEX', 10, 0, index=0)
    sheet.field_text_list_information_classes_add('Warrior', 3, '1d10', 'Player Handbook')
    sheet.field_text_list_information_classes_add('Mage', 1, '1d4', 'Player Handbook')
    sheet.field_text_list_information_classes_add('Mage', 1, '1d4', 'Player Handbook')
    sheet.field_text_list_information_classes_pop(index=2)
    sheet.field_text_list_information_classes_replace('Monk', 1, '1d8', 'Player Handbook', 1)
    sheet.field_text_list_talents_skills_update_all()

    return render(request, 'sheets/test.html', {})
