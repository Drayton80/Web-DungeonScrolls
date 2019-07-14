import datetime

from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Chapter, Bestiary, Creature
from rule_system.models import RuleSystem

def test(request):
    owner = User.objects.filter(username='drayton').first()
    bestiary = Bestiary(name='Test', creation_date=datetime.datetime.now(), owner=owner)
    bestiary.save()
    chapter = Chapter(name='Chapter N', description='', bestiary=bestiary)
    chapter.save()
    creature = Creature.create_dnd35_sheet('Monster', chapter, 'PU')
    creature.save()

    print(creature)

    return render(request, 'sheets/test.html', {})
