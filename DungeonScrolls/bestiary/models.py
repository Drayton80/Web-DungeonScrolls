from django.db import models
from django.contrib.auth.models import User
from sharing.models import Shareable
from rule_system.models import RuleSystem


class Bestiary(Shareable):
    # Attributes:
    name = models.CharField(max_length=30)
    creation_date = models.DateField()

    # Relationships:
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    #room = models.ManyToManyField(Room)

    def __str__(self):
        return str(self.name)


class Chapter(Shareable):
    # Attributes:
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True)

    # Relationships:
    bestiary = models.ForeignKey(Bestiary, on_delete=models.CASCADE)


class Sheet(Shareable):
    # Attributes:
    name = models.CharField(max_length=50)

    # Relationships:
    rule_system = models.ForeignKey(RuleSystem, null=True, on_delete=models.SET_NULL)

    class Meta:
        abstract = True


class Character(Sheet):
    # Relationships:
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    #room = models.ManyToManyField(Room)


class Creature(Sheet):
    # Relationships:
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    ancestral = models.ForeignKey('self', null=True, related_name='creature', on_delete=models.SET_NULL)


class Page(models.Model):
    # Attributes:
    name = models.CharField(max_length=10)
    position = models.IntegerField()

    # Relationships:
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)


class Part(models.Model):
    # Attributes:
    name = models.CharField(max_length=15, blank=True, null=True)
    #row = models.IntegerField()
    #column = models.IntegerField()

    # Relationships:
    page =  models.ForeignKey(Page, on_delete=models.CASCADE)


class Field(models.Model):
    # Attributes:
    name = models.CharField(max_length=15)
    value = models.TextField()
    #row = models.IntegerField()
    #column = models.IntegerField()

    # Relationships:
    part =  models.ForeignKey(Part, on_delete=models.CASCADE)