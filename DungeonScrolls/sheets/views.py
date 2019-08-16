import datetime

from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Chapter, Bestiary, Sheet_DnD35
from rule_system.models import RuleSystem

def test(request):
    owner = User.objects.filter(username='drayton').first()
    bestiary = Bestiary.objects.filter(name='Test').first() 
    #Bestiary(name='Test', creation_date=datetime.datetime.now(), owner=owner)
    #bestiary.save()
    chapter = Chapter.objects.filter(name='Chapter N').first()
    #chapter = Chapter(name='Chapter N', description='', bestiary=bestiary)
    #chapter.save()
    #sheet = Sheet_DnD35(name='Sheet Test', sheet_type='CR', chapter=chapter)
    #sheet.save()
    sheet = Sheet_DnD35.objects.filter(name='Sheet Test').first()
    #sheet.ability_dexterity_modifier = -1
    sheet.save()
    #sheet.skill_add('Stealth', True, 'DEX', 10, 0, index=0)
    sheet.information_classes_add('Warrior', 3, '1d10', 'Player Handbook')
    sheet.information_classes_add('Mage', 1, '1d4', 'Player Handbook')
    sheet.information_classes_add('Mage', 1, '1d4', 'Player Handbook')
    sheet.information_classes_pop(index=2)
    sheet.information_classes_update('Monk', 1, '1d8', 'Player Handbook', 1)
    sheet.talents_skill_refresh_all()

    return render(request, 'sheets/test.html', {})
