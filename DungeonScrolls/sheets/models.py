from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, ContentType
from sharing.models import Shareable
from rule_system.models import RuleSystem


class Bestiary(models.Model):
    # Attributes:
    name = models.CharField(max_length=30)
    creation_date = models.DateField()

    # Relationships:
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    #game = models.ManyToManyField(Game, null=True)

    def __str__(self):
        return str(self.name)


class Chapter(models.Model):
    # Attributes:
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True)

    # Relationships:
    bestiary = models.ForeignKey(Bestiary, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)


class Sheet(Shareable):
    # Attributes:
    name = models.CharField(max_length=50, blank=True)

    # Relationships:
    rule_system = models.ForeignKey(RuleSystem, null=True, on_delete=models.SET_NULL)

    class Meta:
        abstract = True
        
    def __str__(self):
        return str(self.name)
        
    def populate_dnd35_sheet(self, sheet):
        # Pages of the Sheet:
        page_front = Page(name="Front", position=0, sheet=sheet)
        page_front.save()
        page_inventory = Page(name="Inventory", position=1, sheet=sheet)
        page_inventory.save()
        page_magic = Page(name="Magic", position=2, sheet=sheet)
        page_magic.save()
        page_information = Page(name="Information", position=3, sheet=sheet)
        page_information.save()

        # Parts and Fields of Each Page:
        part_attributes = Part(name="Attributes", page=page_front)
        part_attributes.save()
        # [...]


class Character(Sheet):
    # Relationships:
    #room = models.ManyToManyField(Room)

    @classmethod
    def create_dnd35_sheet(cls, name):
        new_sheet = cls(name=name, rule_system=RuleSystem.objects.filter(name='Dungeons & Dragons: 3.5').first())

        cls.populate_dnd35_sheet(cls, new_sheet)

        return new_sheet


class Creature(Sheet):
    # Relationships:
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    ancestral = models.ForeignKey('self', null=True, blank=True, related_name='creature', on_delete=models.SET_NULL)

    @classmethod
    def create_dnd35_sheet(cls, name, chapter, status, ancestral=None):
        dnd35 = RuleSystem.objects.filter(name='Dungeons & Dragons: 3.5').first()

        if ancestral:
            new_sheet = cls(name=name, rule_system=dnd35, chapter=chapter, status=status, ancestral=ancestral)
        else:
            new_sheet = cls(name=name, rule_system=dnd35, chapter=chapter, status=status)

        cls.populate_dnd35_sheet(cls, new_sheet)

        return new_sheet


class Page(models.Model):
    # Attributes:
    name = models.CharField(max_length=10)
    position = models.IntegerField(unique=True)

    # Relationships:
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
    object_id = models.PositiveIntegerField(null=True)
    sheet = GenericForeignKey('content_type', 'object_id')
    # GenericForeignKey permite que o relacionamento extenda-se para todos os filhos
    # do modelo abstrato de nome Sheet

    def __str__(self):
        return str(self.name)


class Part(models.Model):
    # Attributes:
    name = models.CharField(max_length=15, blank=True, null=True)
    row = models.IntegerField(blank=True, default=0)
    column = models.IntegerField(blank=True, default=0)

    # Relationships:
    page =  models.ForeignKey(Page, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)


class Field(models.Model):
    # Attributes:
    name = models.CharField(max_length=15)
    value = models.TextField(blank=True, null=True)
    position = models.IntegerField(unique=True, blank=True, null=True)

    # Relationships:
    part =  models.ForeignKey(Part, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)