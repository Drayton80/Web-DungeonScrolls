import ast
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
        '''
        part_unnamed = ''

        page_general_information_name = 'General Information'
        page_general_information_number = 0
        
        part_abilities = 'Abilites'
        strength_total = Field(
            sheet=sheet, 
            page_name=page_general_information_name, page_number=page_general_information_number, 
            part_name=part_abilities, field_name="Strength Total", field_value="")
        strength_total.save()
        strength_modifier = Field(
            sheet=sheet, 
            page_name=page_general_information_name, page_number=page_general_information_number, 
            part_name=part_abilities, field_name="Strength Modifier", field_value="")
        strength_modifier.save()

        part_saving_throws = 'Saving Throws'
        part_skills = 'Skills'
        
        
        page_front = Field(sheet=sheet, page_name=page_general_information_name, page_number=page_general_information_number, part_name=part_abilities,
                           field_name="Total Strength", field_value="")
        page_front.save()

    sheet = GenericForeignKey('content_type', 'object_id')
        page_battle_information_name = 'Battle Information'
        page_battle_information_number = 1
        part_gear = 'Gear'
        part_attacks = 'Attacks'
        part_special_attacks = 'Special Attacks'

        page_inventory_name = 'Inventário'
        page_inventory_number = 2
        part_riches = 'Riches'
        part_supplies = 'Supplies' 
        part_possesions = 'Possessions'

        page_feats_special_name = 'Feats and Special Abilites'
        page_feats_special_name = 3
        part_feats = 'Feats'
        part_special_abilities = 'Special Abilities'
        
        page_magic_name = 'Magic'
        page_magic_number = 4
        part_spells = 'Spells'
        part_slots = 'Spells Slots'

        page_annotations_name = 'Annotations'
        page_annotations_number = 5
        part_background = 'Background'
        part_appearance = 'Detailed Appearance'
        part_other = 'Other Notes'
        '''


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

'''
class Page(models.Model):
    # Attributes:
    name = models.CharField(max_length=10)
    number = models.IntegerField(unique=True)

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
'''

class Field(models.Model):
    # Page - Attributes:
    page_name = models.CharField(max_length=30, default='')
    number = models.IntegerField(unique=True, default=0)
    # Part - Attributes:
    part_name = models.CharField(max_length=50, blank=True, null=True)
    row = models.IntegerField(blank=True, default=0)
    column = models.IntegerField(blank=True, default=0)
    # Field - Attributes:
    field_name = models.CharField(max_length=50, default='')
    value = models.TextField(blank=True, null=True)
    position = models.IntegerField(unique=True, blank=True, null=True)    

    # Relationships:
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
    object_id = models.PositiveIntegerField(null=True)
    sheet = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return str(self.name)


class Sheet_DnD35(Shareable):
    # ATTRIBUTES:
    # General:
    name = models.CharField(max_length=50, blank=True)
    sheet_type = models.CharField(max_length=2, choices=(('CH', 'Character'), ('CR', 'Creature'),))  
    # Specific:
    information_name = models.TextField(blank=True, null=True)
    information_classes = models.TextField(blank=True, null=True)
    information_level = models.TextField(blank=True, null=True)
    information_experience = models.TextField(blank=True, null=True)
    information_race = models.TextField(blank=True, null=True)
    information_gender = models.TextField(blank=True, null=True)
    information_size = models.TextField(blank=True, null=True)
    information_size_modifier = models.IntegerField(blank=True, null=True, default=None)
    information_age = models.TextField(blank=True, null=True)
    information_alignment = models.TextField(blank=True, null=True)
    information_deity = models.TextField(blank=True, null=True)
    information_languages = models.TextField(blank=True, null=True)
    
    ability_strength_base = models.IntegerField(blank=True, null=True, default=None)
    ability_strength_modifier = models.IntegerField(blank=True, null=True, default=None)
   
    ability_dexterity_base = models.IntegerField(blank=True, null=True, default=None)
    ability_dexterity_modifier = models.IntegerField(blank=True, null=True, default=None)

    ability_constitution_base = models.IntegerField(blank=True, null=True, default=None)
    ability_constitution_modifier = models.IntegerField(blank=True, null=True, default=None)

    ability_intelligence_base = models.IntegerField(blank=True, null=True, default=None)
    ability_intelligence_modifier = models.IntegerField(blank=True, null=True, default=None)

    ability_wisdom_base = models.IntegerField(blank=True, null=True, default=None)
    ability_wisdom_modifier = models.IntegerField(blank=True, null=True, default=None)

    ability_charisma_base = models.IntegerField(blank=True, null=True, default=None)
    ability_charisma_modifier = models.IntegerField(blank=True, null=True, default=None)

    saving_throws_fortitude_total = models.IntegerField(blank=True, null=True, default=None)
    saving_throws_fortitude_base = models.IntegerField(blank=True, null=True, default=None)
    saving_throws_fortitude_temporary = models.IntegerField(blank=True, null=True, default=None)
    saving_throws_fortitude_others = models.IntegerField(blank=True, null=True, default=None)

    saving_throws_reflex_total = models.IntegerField(blank=True, null=True, default=None)
    saving_throws_reflex_base = models.IntegerField(blank=True, null=True, default=None)
    saving_throws_reflex_temporary = models.IntegerField(blank=True, null=True, default=None)
    saving_throws_reflex_others = models.IntegerField(blank=True, null=True, default=None)

    saving_throws_will_total = models.IntegerField(blank=True, null=True, default=None)
    saving_throws_will_base = models.IntegerField(blank=True, null=True, default=None)
    saving_throws_will_temporary = models.IntegerField(blank=True, null=True, default=None)
    saving_throws_will_others = models.IntegerField(blank=True, null=True, default=None)

    battle_speed = models.TextField(blank=True, null=True, default=None)
    battle_initiative_total = models.IntegerField(blank=True, null=True, default=None)
    battle_initiative_others = models.IntegerField(blank=True, null=True, default=None)
    battle_hp_total = models.IntegerField(blank=True, null=True, default=None)
    battle_hp_current = models.IntegerField(blank=True, null=True, default=None)
    battle_hp_nonlethal = models.IntegerField(blank=True, null=True, default=None)
    battle_ca_total = models.IntegerField(blank=True, null=True, default=None)
    battle_ca_touch = models.IntegerField(blank=True, null=True, default=None)
    battle_ca_flat_footed = models.IntegerField(blank=True, null=True, default=None)
    battle_ca_natural_armor = models.IntegerField(blank=True, null=True, default=None)
    battle_ca_other_modifier = models.IntegerField(blank=True, null=True, default=None)
    battle_damage_reduction = models.IntegerField(blank=True, null=True, default=None)
    battle_spell_resistance = models.IntegerField(blank=True, null=True, default=None)
    battle_base_attack_bonus = models.IntegerField(blank=True, null=True, default=None)
    battle_grapple_total = models.IntegerField(blank=True, null=True, default=None)
    battle_grapple_others = models.IntegerField(blank=True, null=True, default=None)
    battle_attacks = models.TextField(blank=True, null=True, default=None)
    battle_special_attacks = models.TextField(blank=True, null=True, default=None)
    battle_equipments = models.TextField(blank=True, null=True, default=None)

    inventory_riches = models.TextField(blank=True, null=True, default=None)
    inventory_supplies = models.TextField(blank=True, null=True, default=None)
    inventory_possessions = models.TextField(blank=True, null=True, default=None)
    inventory_weight_total = models.IntegerField(blank=True, null=True, default=None)
    inventory_weight_light = models.IntegerField(blank=True, null=True, default=None)
    inventory_weight_medium = models.IntegerField(blank=True, null=True, default=None)
    inventory_weight_heavy = models.IntegerField(blank=True, null=True, default=None)
    inventory_weight_maximum = models.IntegerField(blank=True, null=True, default=None)
    
    talents_skills = models.TextField(blank=True, null=True, default=None)
    talents_feats = models.TextField(blank=True, null=True, default=None)
    talents_special_abilities = models.TextField(blank=True, null=True, default=None)

    magic_spells = models.TextField(blank=True, null=True, default=None)
    magic_slots = models.TextField(blank=True, null=True, default=None)
    magic_spell_save = models.IntegerField(blank=True, null=True, default=None)
    magic_arcane_spell_failure = models.IntegerField(blank=True, null=True, default=None)

    annotations_appearance = models.TextField(blank=True, null=True, default=None)
    annotations_background = models.TextField(blank=True, null=True, default=None)
    annotations_others = models.TextField(blank=True, null=True, default=None)

    # If that sheet is a companion of other character/creature:
    companion_pet_master = models.ForeignKey('self', related_name='pet', null=True, blank=True, default=None, on_delete=models.SET_NULL)
    companion_leader = models.ForeignKey('self', related_name='follower', null=True, blank=True, default=None, on_delete=models.SET_NULL)

    # RELATIONSHIPS::
    rule_system = models.ForeignKey(RuleSystem, blank=True, null=True, default=None, on_delete=models.SET_NULL)
    # Character:
    #game = models.ManyToManyField(Game)
    # Creature:
    chapter = models.ForeignKey(Chapter, null=True, blank=True, default=None, on_delete=models.CASCADE)
    ancestral = models.ForeignKey('self', null=True, blank=True, default=None, related_name='creature', on_delete=models.SET_NULL)
        
    
    separator = '|;|\n'

    
    def __str__(self):
        return str(self.name)
    
    def get_ability_modifier(self, ability_name: str):
        if ability_name.lower() in ['str', 'strength']:
            ability_modifier = getattr(self, 'ability_strength_modifier')

        elif ability_name.lower() in ['dex', 'dexterity']:
            ability_modifier = getattr(self, 'ability_dexterity_modifier')

        elif ability_name.lower() in ['con', 'constitution']:
            ability_modifier = getattr(self, 'ability_constitution_modifier')

        elif ability_name.lower() in ['int', 'intelligence']:
            ability_modifier = getattr(self, 'ability_intelligence_modifier')

        elif ability_name.lower() in ['wis', 'wisdom']:
            ability_modifier = getattr(self, 'ability_wisdom_modifier')

        elif ability_name.lower() in ['cha', 'charisma']:
            ability_modifier = getattr(self, 'ability_charisma_modifier')

        else:
            ability_modifier = 0
        
        if ability_modifier is not None: 
            return ability_modifier
        else:
            return 0

    def list_to_field_text_list(self, proper_list: list):
        first_element = True
        
        for item in proper_list:
            if first_element:
                custom_text_separate = str(item)
                first_element = False
            else:
                custom_text_separate += self.separator + str(item)

        return custom_text_separate

    def field_text_list_add(self, field_text_list, new_element, index='append'):
        if field_text_list == None or field_text_list == '':
            proper_list = []
        elif isinstance(field_text_list, str):
            proper_list = field_text_list.split(self.separator)
        else:
            return field_text_list

        if index == 'append':
            proper_list.append(new_element)
        elif isinstance(index, int):
            proper_list.insert(index, new_element)

        modified_field_text_list = self.list_to_field_text_list(proper_list)

        return modified_field_text_list

    def field_text_list_pop(self, field_text_list, index='first'):
        if isinstance(field_text_list, str) and not field_text_list == '':
            proper_list = field_text_list.split(self.separator)
        else:
            return field_text_list
 
        if index == 'first':
            proper_list.pop()
        elif isinstance(index, int):
            proper_list.pop(index)

        modified_field_text_list = self.list_to_field_text_list(proper_list)

        return modified_field_text_list

    def field_text_list_update(self, index, field_text_list, update_element):
        if isinstance(field_text_list, str) and not field_text_list == '':
            proper_list = field_text_list.split(self.separator)
        else:
            return field_text_list

        if isinstance(index, int) and 0 <= index and index < len(proper_list):
            proper_list[index] = update_element

        modified_field_text_list = self.list_to_field_text_list(proper_list)

        return modified_field_text_list            


    def skill_add(self, name, class_skill, key_ability_name, points_ranks, points_others_modifiers, index='append'):
        ability_modifier = self.get_ability_modifier(key_ability_name)
        
        new_skill = {
            'name': name,
            'key_ability_name': key_ability_name,
            'class_skill': class_skill,
            'points_total': ability_modifier + int(points_ranks) + int(points_others_modifiers),
            'points_ranks': points_ranks,
            'points_others_modifiers': points_others_modifiers
        }

        self.talents_skills = self.field_text_list_add(self.talents_skills, new_skill, index=index)
        self.save()

    def skill_refresh_all(self):
        field_text_list = getattr(self, 'talents_skills')
        first_element = True

        for skill_as_text in field_text_list.split(self.separator):
            skill_as_dict = ast.literal_eval(skill_as_text)

            ability_modifier = self.get_ability_modifier(skill_as_dict['key_ability_name'])

            skill_as_dict['points_total'] = ability_modifier + int(skill_as_dict['points_ranks']) + int(skill_as_dict['points_others_modifiers'])
            
            if first_element:
                custom_text_separate = str(skill_as_dict)
                first_element = False
            else:
                custom_text_separate += self.separator + str(skill_as_dict)
        
        self.talents_skills = custom_text_separate
        self.save()

        
        

        