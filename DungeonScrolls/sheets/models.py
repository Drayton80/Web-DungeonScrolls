from django.db import models
from django.contrib.auth.models import User
from sharing.models import Shareable
from rule_system.models import RuleSystem


class Bestiary(models.Model):
    # Attributes:
    name = models.CharField(max_length=30)
    creation_date = models.DateField()

    # Relationships:
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    #room = models.ManyToManyField(Room)

    def __str__(self):
        return str(self.name)


class Chapter(models.Model):
    # Attributes:
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True)

    # Relationships:
    bestiary = models.ForeignKey(Bestiary, on_delete=models.CASCADE)


class Sheet(Shareable):
    # Attributes:
    name = models.CharField(max_length=50, blank=True)

    # Relationships:
    rule_system = models.ForeignKey(RuleSystem, null=True, on_delete=models.SET_NULL)

    class Meta:
        abstract = True

    def populate_dnd35_sheet(self, sheet):
        # Pages of the Sheet:
        page_front = Page(name="Front", position=0, sheet=sheet)
        page_inventory = Page(name="Inventory", position=1, sheet=sheet)
        page_magic = Page(name="Magic", position=2, sheet=sheet)
        page_information = Page(name="Information", position=3, sheet=sheet)

        # Parts and Fields of Each Page:
        part_attributes = Part(name="Attributes", row="", column="", page=page_front)
        # [...]


class Character(Sheet):
    # Relationships:
    #room = models.ManyToManyField(Room)
    pass

    @classmethod
    def create_dnd35_sheet(cls, name):
        if isinstance(cls, Character):
            new_sheet = cls(name=name, rule_system=RuleSystem.objects.filter(name='Dungeons & Dragons: 3.5').first())
            new_sheet.save()

            cls.populate_dnd35_sheet(cls, new_sheet)

            return new_sheet


class Creature(Sheet):
    # Relationships:
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    ancestral = models.ForeignKey('self', null=True, blank=True, related_name='creature', on_delete=models.SET_NULL)

    @classmethod
    def create_dnd35_sheet(cls, name, chapter, ancestral=""):
        if isinstance(cls, Character):
            dnd35 = RuleSystem.objects.filter(name='Dungeons & Dragons: 3.5').first()

            new_sheet = cls(name=name, rule_system=dnd35, chapter=chapter, ancestral=ancestral)
            new_sheet.save()

            cls.populate_dnd35_sheet(cls, new_sheet)

            return new_sheet


class Page(models.Model):
    # Attributes:
    name = models.CharField(max_length=10)
    position = models.IntegerField(unique=True, blank=True)

    # Relationships:
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE)


class Part(models.Model):
    # Attributes:
    name = models.CharField(max_length=15, blank=True, null=True)
    row = models.IntegerField(blank=True)
    column = models.IntegerField(blank=True)

    # Relationships:
    page =  models.ForeignKey(Page, on_delete=models.CASCADE)


class Field(models.Model):
    # Attributes:
    name = models.CharField(max_length=15)
    value = models.TextField(blank=True)
    position = models.IntegerField(unique=True, blank=True)

    # Relationships:
    part =  models.ForeignKey(Part, on_delete=models.CASCADE)