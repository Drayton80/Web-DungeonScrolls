import ast
import math
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
        return str(getattr(self, 'page_name')) + ' - ' + str(getattr(self, 'part_name')) + ' - ' + str(getattr(self, 'field_name'))


class Sheet_DnD35(Shareable):
    # ATTRIBUTES:
    # General:
    name = models.CharField(max_length=50, blank=True)
    sheet_type = models.CharField(max_length=2, choices=(('CH', 'Character'), ('CR', 'Creature'),))  
    # Specific:
    information_name = models.TextField(blank=True, null=True)
    information_classes = models.TextField(blank=True, null=True)
    information_level = models.IntegerField(blank=True, null=True, default=None)
    information_experience = models.IntegerField(blank=True, null=True, default=None)
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
    battle_ca_equipment_armor = models.IntegerField(blank=True, null=True, default=None)
    battle_ca_natural_armor = models.IntegerField(blank=True, null=True, default=None)
    battle_ca_deflection_modifier = models.IntegerField(blank=True, null=True, default=None)
    battle_ca_other_modifier = models.IntegerField(blank=True, null=True, default=None)
    battle_damage_reduction = models.IntegerField(blank=True, null=True, default=None)
    battle_spell_resistance = models.IntegerField(blank=True, null=True, default=None)
    battle_base_attack_bonus = models.IntegerField(blank=True, null=True, default=None)
    battle_grapple_total = models.IntegerField(blank=True, null=True, default=None)
    battle_grapple_others = models.IntegerField(blank=True, null=True, default=None)
    battle_attacks = models.TextField(blank=True, null=True, default=None)
    battle_special_attacks = models.TextField(blank=True, null=True, default=None)
    
    inventory_equipments = models.TextField(blank=True, null=True, default=None)
    inventory_possessions = models.TextField(blank=True, null=True, default=None)
    inventory_money = models.TextField(blank=True, null=True, default=None)
    inventory_weight_current = models.IntegerField(blank=True, null=True, default=None)
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
        
    
    separator = '|;|'
    separator_substitute = '|;.;|'  # Serve para substituir o separator caso ele esteja no texto que será incluido

    
    def __str__(self):
        return str(self.name)

    # CHECKED VALUE AS:
    # Métodos que checam se um determinado valor é numérico e, caso seja, retornam esse valor num formato específico.
    # Esses métodos são necessários pois muitos dos campos do Banco de Dados podem ou não estarem preenchidos e, mesmo
    # que não estejam, há outros campos que requisitam os valores deles para determinados cálculos
    def checked_value_as_integer(self, value):
        if value == None or value == '' or (isinstance(value, str) and not value.isdigit()):
            return 0
        else:
            return int(value)

    def checked_value_as_float(self, value):
        try:
            value_as_float = float(value)

            if not math.isnan(value_as_float):
                return value_as_float

        except ValueError:
            pass
            
        finally:
            return 0
    
    def check_if_there_is_separator_and_replace(self, value):
        if isinstance(value, str):
            value.replace(self.separator, self.separator_substitute)
        elif isinstance(value, dict):
            for key in value.keys():
                if isinstance(value[key], str):
                    value[key] = value[key].replace(self.separator, self.separator_substitute)
        
        return value

    # FORMULA:
    # São métodos relativos à fórmulas específicas que são usadas em diversos outros métodos:
    def formula_ability_modifier(self, ability_total):
        return int(ability_total/2)-5
        
    def formula_talents_skill_points_total(self, key_ability_name, points_ranks, points_others_modifiers) -> int:
        ability_modifier = self.get_ability_modifier_by_name(key_ability_name)

        return ability_modifier + self.checked_value_as_integer(points_ranks) + self.checked_value_as_integer(points_others_modifiers)

    def formula_battle_initiative_total(self):
        return self.get_ability_dexterity_modifier() + self.get_battle_initiative_others()
    
    def formula_battle_ca_total(self) -> int:
        return 10 + self.get_ability_dexterity_modifier() + self.get_battle_ca_deflection_modifier() + self.get_battle_ca_natural_armor() + self.get_battle_ca_equipment_armor() + self.get_battle_ca_other_modifier()

    def formula_battle_ca_touch(self) -> int:
        return 10 + self.get_ability_dexterity_modifier() + self.get_battle_ca_deflection_modifier() + self.get_battle_ca_other_modifier()

    def formula_battle_ca_flat_footed(self) -> int:
        return 10 + self.get_battle_ca_deflection_modifier() + self.get_battle_ca_natural_armor() + self.get_battle_ca_equipment_armor() + self.get_battle_ca_other_modifier()

    def formula_battle_attacks_bonus_total(self, key_ability_name, bonus_others) -> int:
        ability_modifier = self.get_ability_modifier_by_name(key_ability_name)

        return ability_modifier + self.get_battle_base_attack_bonus() + self.checked_value_as_integer(bonus_others) + self.get_information_size_modifier()

    # GET METHODS:
    # Como vários valores inteiros podem ser nulos, o get aqui também serve para checar se o campo possui algum número
    # para retornar 0 caso não tenha, isso é necessário pois muitos dos campos servem de cálculo para outros então
    # para não quebrar esses cálculos isso precisa ser feito
    def get_information_size_modifier(self) -> int:
        field_attribute = getattr(self, 'information_size_modifier')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_strength_base(self) -> int:
        field_attribute = getattr(self, 'ability_strength_base')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_strength_modifier(self) -> int:
        field_attribute = getattr(self, 'ability_strength_modifier')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_dexterity_base(self) -> int:
        field_attribute = getattr(self, 'ability_dexterity_base')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_dexterity_modifier(self) -> int:
        field_attribute = getattr(self, 'ability_dexterity_modifier')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_constitution_base(self) -> int:
        field_attribute = getattr(self, 'ability_constitution_base')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_constitution_modifier(self) -> int:
        field_attribute = getattr(self, 'ability_constitution_modifier')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_intelligence_base(self) -> int:
        field_attribute = getattr(self, 'ability_intelligence_base')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_intelligence_modifier(self) -> int:
        field_attribute = getattr(self, 'ability_intelligence_modifier')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_wisdom_base(self) -> int:
        field_attribute = getattr(self, 'ability_wisdom_base')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_wisdom_modifier(self) -> int:
        field_attribute = getattr(self, 'ability_wisdom_modifier')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_charisma_base(self) -> int:
        field_attribute = getattr(self, 'ability_charisma_base')

        return self.checked_value_as_integer(field_attribute)

    def get_ability_charisma_modifier(self) -> int:
        field_attribute = getattr(self, 'ability_charisma_modifier')

        return self.checked_value_as_integer(field_attribute)
    
    def get_ability_modifier_by_name(self, ability_name: str):
        if ability_name.lower() in ['str', 'strength']:
            ability_modifier = self.get_ability_strength_modifier()

        elif ability_name.lower() in ['dex', 'dexterity']:
            ability_modifier = self.get_ability_dexterity_modifier()

        elif ability_name.lower() in ['con', 'constitution']:
            ability_modifier = self.get_ability_constitution_modifier()

        elif ability_name.lower() in ['int', 'intelligence']:
            ability_modifier = self.get_ability_intelligence_modifier()

        elif ability_name.lower() in ['wis', 'wisdom']:
            ability_modifier = self.get_ability_wisdom_modifier()

        elif ability_name.lower() in ['cha', 'charisma']:
            ability_modifier = self.get_ability_charisma_modifier()

        else:
            ability_modifier = 0
        
        if ability_modifier is not None: 
            return ability_modifier
        else:
            return 0

    def get_saving_throws_fortitude_base(self) -> int:
        field_attribute = getattr(self, 'saving_throws_fortitude_base')

        return self.checked_value_as_integer(field_attribute)
    
    def get_saving_throws_fortitude_temporary(self) -> int:
        field_attribute = getattr(self, 'saving_throws_fortitude_temporary')

        return self.checked_value_as_integer(field_attribute)

    def get_saving_throws_fortitude_others(self) -> int:
        field_attribute = getattr(self, 'saving_throws_fortitude_others')

        return self.checked_value_as_integer(field_attribute)

    def get_saving_throws_reflex_base(self) -> int:
        field_attribute = getattr(self, 'saving_throws_reflex_base')

        return self.checked_value_as_integer(field_attribute)
    
    def get_saving_throws_reflex_temporary(self) -> int:
        field_attribute = getattr(self, 'saving_throws_reflex_temporary')

        return self.checked_value_as_integer(field_attribute)

    def get_saving_throws_reflex_others(self) -> int:
        field_attribute = getattr(self, 'saving_throws_reflex_others')

        return self.checked_value_as_integer(field_attribute)

    def get_saving_throws_will_base(self) -> int:
        field_attribute = getattr(self, 'saving_throws_will_base')

        return self.checked_value_as_integer(field_attribute)
    
    def get_saving_throws_will_temporary(self) -> int:
        field_attribute = getattr(self, 'saving_throws_will_temporary')

        return self.checked_value_as_integer(field_attribute)

    def get_saving_throws_will_others(self) -> int:
        field_attribute = getattr(self, 'saving_throws_will_others')

        return self.checked_value_as_integer(field_attribute)

    def get_battle_initiative_total(self) -> int:
        return getattr(self, 'battle_initiative_total')

    def get_battle_initiative_others(self) -> int:
        field_attribute = getattr(self, 'battle_initiative_others')

        return self.checked_value_as_integer(field_attribute)

    def get_battle_hp_total(self) -> int:
        return getattr(self, 'battle_hp_total')

    def get_battle_hp_current(self) -> int:
        return getattr(self, 'battle_hp_current')

    def get_battle_hp_nonlethal(self) -> int:
        return getattr(self, 'battle_hp_nonlethal')

    def get_battle_ca_total(self) -> int:
        return getattr(self, 'battle_ca_total')

    def get_battle_ca_touch(self) -> int:
        return getattr(self, 'battle_ca_touch')

    def get_battle_ca_flat_footed(self) -> int:
        return getattr(self, 'battle_ca_flat_footed')

    def get_battle_ca_equipment_armor(self) -> int:
        field_attribute = getattr(self, 'battle_ca_equipment_armor')

        return self.checked_value_as_integer(field_attribute)

    def get_battle_ca_natural_armor(self) -> int:
        field_attribute = getattr(self, 'battle_ca_natural_armor')

        return self.checked_value_as_integer(field_attribute)

    def get_battle_ca_deflection_modifier(self) -> int:
        field_attribute = getattr(self, 'battle_ca_deflection_modifier')

        return self.checked_value_as_integer(field_attribute)

    def get_battle_ca_other_modifier(self) -> int:
        field_attribute = getattr(self, 'battle_ca_other_modifier')

        return self.checked_value_as_integer(field_attribute)
    
    def get_battle_base_attack_bonus(self) -> int:
        field_attribute = getattr(self, 'battle_base_attack_bonus')

        return self.checked_value_as_integer(field_attribute)
    
    # UPDATE METHODS:
    # São métodos relativos a atualização de certos campos do Banco de Dados que possuem seus valores dependentes
    # de outros campos ou de partes de outros campos
    # OBS.: Os campos que são atualizados automaticamente baseados em outros (Métodos Update) não podem ser modificados via Método Set
    def update_ability_strength_modifier(self):
        self.ability_strength_modifier = self.formula_ability_modifier(self.get_ability_strength_base)
        self.save()

    def update_ability_dexterity_modifier(self):
        self.ability_dexterity_modifier = self.formula_ability_modifier(self.get_ability_dexterity_base)
        self.save()
        self.update_saving_throws_reflex_total()
        self.update_battle_ca_total()
        self.update_battle_ca_touch()

    def update_ability_constitution_modifier(self):
        self.ability_constitution_modifier = self.formula_ability_modifier(self.get_ability_constitution_base)
        self.save()
        self.update_saving_throws_fortitude_total()

    def update_ability_intelligence_modifier(self):
        self.ability_intelligence_modifier = self.formula_ability_modifier(self.get_ability_intelligence_base)
        self.save()

    def update_ability_wisdom_modifier(self):
        self.ability_wisdom_modifier = self.formula_ability_modifier(self.get_ability_wisdom_base)
        self.save()
        self.update_saving_throws_will_total()

    def update_ability_charisma_modifier(self):
        self.ability_charisma_modifier = self.formula_ability_modifier(self.get_ability_charisma_base)
        self.save()
    
    def update_saving_throws_fortitude_total(self):
        self.saving_throws_fortitude_total = self.get_ability_constitution_modifier() + self.get_saving_throws_fortitude_base() + self.get_saving_throws_fortitude_temporary() + self.get_saving_throws_fortitude_others()
        self.save()
    
    def update_saving_throws_reflex_total(self):
        self.saving_throws_reflex_total = self.get_ability_dexterity_modifier() + self.get_saving_throws_reflex_base() + self.get_saving_throws_reflex_temporary() + self.get_saving_throws_reflex_others()
        self.save()

    def update_saving_throws_will_total(self):
        self.saving_throws_will_total = self.get_ability_wisdom_modifier() + self.get_saving_throws_will_base() + self.get_saving_throws_will_temporary() + self.get_saving_throws_will_others()
        self.save()

    def update_battle_initiative_total(self):
        self.battle_initiative_total = self.formula_battle_initiative_total()
        self.save()

    def update_battle_ca_total(self):
        self.battle_ca_total = self.formula_battle_ca_total()

    def update_battle_ca_touch(self):
        self.battle_ca_touch = self.formula_battle_ca_touch()

    def update_battle_ca_flat_footed(self):
        self.battle_ca_flat_footed = self.formula_battle_ca_flat_footed()
    
    def update_battle_ca_equipment_armor(self):
        inventory_equipments_list = self.field_text_list_to_list(getattr(self, 'inventory_equipments'))
        ca_equipment_armor = 0

        for equipment in inventory_equipments_list:
            ca_equipment_armor += self.checked_value_as_integer(equipment['armor_class_bonus'])
        
        self.battle_ca_equipment_armor = ca_equipment_armor
        self.save()
    
    def update_inventory_weight_current(self):
        inventory_equipments_list = self.field_text_list_to_list(getattr(self, 'inventory_equipments'))
        inventory_possessions_list = self.field_text_list_to_list(getattr(self, 'inventory_possessions'))

        weight_current = 0

        for equipment in inventory_equipments_list:
            weight_current += self.checked_value_as_float(equipment['weight'])

        for possession in inventory_possessions_list:
            weight_current += self.checked_value_as_float(possession['weight'])

        self.inventory_weight_current = weight_current
        self.save()

    # SET METHODS:
    # Os Sets aqui servem para atribuir o novo valor da campo e atualizar todos os campos que dependem dele para terem determinado valor:
    # OBS.: Os campos que são atualizados automaticamente baseados em outros (Métodos Update) não podem ser modificados via Método Set
    def set_ability_strength_base(self, ability_strength_base):
        self.ability_strength_base = ability_strength_base
        self.save()
        self.update_ability_strength_modifier()
    
    def set_ability_dexterity_base(self, ability_dexterity_base):
        self.ability_dexterity_base = ability_dexterity_base
        self.save()
        self.update_ability_dexterity_modifier()

    def set_ability_constitution_base(self, ability_constitution_base):
        self.ability_constitution_base = ability_constitution_base
        self.save()
        self.update_ability_constitution_modifier()

    def set_ability_intelligence_base(self, ability_intelligence_base):
        self.ability_intelligence_base = ability_intelligence_base
        self.save()
        self.update_ability_intelligence_modifier()

    def set_ability_wisdom_base(self, ability_wisdom_base):
        self.ability_wisdom_base = ability_wisdom_base
        self.save()
        self.update_ability_wisdom_modifier()

    def set_ability_charisma_base(self, ability_charisma_base):
        self.ability_charisma_base = ability_charisma_base
        self.save()
        self.update_ability_charisma_modifier()

    def set_saving_throws_fortitude_base(self, saving_throws_fortitude_base):
        self.saving_throws_fortitude_base = saving_throws_fortitude_base
        self.update_saving_throws_fortitude_total()

    def set_saving_throws_fortitude_temporary(self, saving_throws_fortitude_temporary):
        self.saving_throws_fortitude_temporary = saving_throws_fortitude_temporary
        self.update_saving_throws_fortitude_total()

    def set_saving_throws_fortitude_others(self, saving_throws_fortitude_others):
        self.saving_throws_fortitude_others = saving_throws_fortitude_others
        self.update_saving_throws_fortitude_total()

    def set_saving_throws_reflex_base(self, saving_throws_reflex_base):
        self.saving_throws_reflex_base = saving_throws_reflex_base
        self.update_saving_throws_reflex_total()

    def set_saving_throws_reflex_temporary(self, saving_throws_reflex_temporary):
        self.saving_throws_reflex_temporary = saving_throws_reflex_temporary
        self.update_saving_throws_reflex_total()

    def set_saving_throws_reflex_others(self, saving_throws_reflex_others):
        self.saving_throws_reflex_others = saving_throws_reflex_others
        self.update_saving_throws_reflex_total()

    def set_saving_throws_will_base(self, saving_throws_will_base):
        self.saving_throws_will_base = saving_throws_will_base
        self.update_saving_throws_will_total()

    def set_saving_throws_will_temporary(self, saving_throws_will_temporary):
        self.saving_throws_will_temporary = saving_throws_will_temporary
        self.update_saving_throws_will_total()

    def set_saving_throws_will_others(self, saving_throws_will_others):
        self.saving_throws_will_others = saving_throws_will_others
        self.update_saving_throws_will_total()   

    def set_battle_initiative_others(self, battle_initiative_others):
        self.battle_initiative_others = battle_initiative_others
        self.save()
        self.update_battle_initiative_total()

    def set_battle_hp_total(self, battle_hp_total):
        self.battle_hp_total = battle_hp_total
        self.save()

    def set_battle_hp_current(self, battle_hp_current):
        self.battle_hp_current = battle_hp_current
        self.save()

    def set_battle_hp_nonlethal(self, battle_hp_nonlethal):
        self.battle_hp_nonlethal = battle_hp_nonlethal
        self.save()

    def set_battle_ca_natural_armor(self, battle_ca_natural_armor):
        self.battle_ca_natural_armor = battle_ca_natural_armor
        self.save()
        self.update_battle_ca_total()
        self.update_battle_ca_flat_footed()

    def set_battle_ca_deflection_modifier(self, battle_ca_deflection_modifier):
        self.battle_ca_deflection_modifier = battle_ca_deflection_modifier
        self.save()
        self.update_battle_ca_total()
        self.update_battle_ca_flat_footed()

    def set_battle_ca_other_modifier(self, battle_ca_other_modifier):
        self.battle_ca_other_modifier = battle_ca_other_modifier
        self.save()
        self.update_battle_ca_total()
        self.update_battle_ca_touch()
        self.update_battle_ca_flat_footed()

    # FIELD TEXT LIST - GENERIC:
    # São métodos que lidam com um tipo especial de campo que possuí em seu interior uma estrutura de dados convertida
    # para String, no caso a estrutura aqui é uma lista de dicionários (aqui ficam os métodos mais genéricos que lidam
    # apenas com uma forma abstrata dessa lista, ou seja, não levam em conta a forma específica de cada dicionário)
    def field_text_list_element_dict_from_str(self, element):
        # Transforma uma string no formato de um dicionário em um dict do python:
        return ast.literal_eval(element)
    
    def field_text_list_from_list(self, proper_list: list):
        first_element = True
        
        for item in proper_list:
            if first_element:
                custom_text_separate = str(item)
                first_element = False
            else:
                custom_text_separate += self.separator + str(item)

        return custom_text_separate

    def field_text_list_to_list(self, field_text_list: str):
        proper_list = []

        for element_as_string in field_text_list.split(self.separator):
            element_as_dict = self.field_text_list_element_dict_from_str(element_as_string)

            proper_list.append(element_as_dict)

        return proper_list

    def field_text_list_add(self, field_text_list, new_element, index='append'):
        if field_text_list == None or field_text_list == '':
            proper_list = []
        elif isinstance(field_text_list, str):
            proper_list = field_text_list.split(self.separator)
        else:
            return field_text_list

        new_element = self.check_if_there_is_separator_and_replace(new_element)

        if index == 'append':
            proper_list.append(new_element)
        elif isinstance(index, int):
            proper_list.insert(index, new_element)

        modified_field_text_list = self.field_text_list_from_list(proper_list)

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

        modified_field_text_list = self.field_text_list_from_list(proper_list)

        return modified_field_text_list

    def field_text_list_replace(self, field_text_list, new_element, index):
        if isinstance(field_text_list, str) and not field_text_list == '':
            proper_list = field_text_list.split(self.separator)
        else:
            return field_text_list

        if isinstance(index, int) and 0 <= index and index < len(proper_list):
            new_element = self.check_if_there_is_separator_and_replace(new_element)

            proper_list[index] = new_element

        modified_field_text_list = self.field_text_list_from_list(proper_list)

        return modified_field_text_list    

    # FIELD TEXT LIST - SPECIFIC:
    # Aqui ficam os métodos específicos de cada campo que usam os métodos mais genéricos acima, é necessário essa distinção
    # pois cada Field Text List possuí um tipo de dicionário específico relativo ao seu domínio:
    def field_text_list_talents_skills_get(self):
        field_text_list = getattr(self, 'talents_skills')
        
        if isinstance(field_text_list, str) and not field_text_list == '':
            proper_list = field_text_list.split(self.separator)

            for i in range(len(proper_list)):
                if isinstance(proper_list[i], str):
                    proper_list[i] = proper_list[i].replace(self.separator_substitute, self.separator)

            proper_list[i] = self.field_text_list_element_dict_from_str(proper_list[i])

            return proper_list
    
    def field_text_list_talents_skills_add(self, name, class_skill, key_ability_name, points_ranks, points_others_modifiers, index='append'):
        skill = {
            'name': name,
            'key_ability_name': key_ability_name,
            'class_skill': class_skill,
            'points_total': self.formula_talents_skill_points_total(key_ability_name, points_ranks, points_others_modifiers),
            'points_ranks': points_ranks,
            'points_others_modifiers': points_others_modifiers
        }

        self.talents_skills = self.field_text_list_add(self.talents_skills, skill, index=index)
        self.save()

    def field_text_list_talents_skills_pop(self, index='first'):
        self.talents_skills = self.field_text_list_pop(self.talents_skills, index=index)
        self.save()

    def field_text_list_talents_skills_replace(self, name, class_skill, key_ability_name, points_ranks, points_others_modifiers, index):
        skill = {
            'name': name,
            'key_ability_name': key_ability_name,
            'class_skill': class_skill,
            'points_total': self.formula_talents_skill_points_total(key_ability_name, points_ranks, points_others_modifiers),
            'points_ranks': points_ranks,
            'points_others_modifiers': points_others_modifiers
        }

        self.talents_skills = self.field_text_list_replace(self.talents_skills, skill, index)
        self.save()

    def field_text_list_talents_skills_update_all(self):
        skill_list = self.field_text_list_to_list(getattr(self, 'talents_skills'))

        for i in range(len(skill_list)):
            key_ability_name = skill_list[i]['key_ability_name']
            points_ranks = skill_list[i]['points_ranks']
            points_others_modifiers = skill_list[i]['points_others_modifiers']

            skill_list[i]['points_total'] = self.formula_talents_skill_points_total(key_ability_name, points_ranks, points_others_modifiers)
        
        self.talents_skills = self.field_text_list_from_list(skill_list)
        self.save()

    def field_text_list_information_classes_add(self, name, levels, hit_dice, source_book, index='append'):        
        new_class = {
            'name': name,
            'levels': levels,
            'hit_dice': hit_dice,
            'source_book': source_book
        }

        self.information_classes = self.field_text_list_add(self.information_classes, new_class, index=index)
        self.save()

    def field_text_list_information_classes_pop(self, index='first'):
        self.information_classes = self.field_text_list_pop(self.information_classes, index=index)
        self.save()

    def field_text_list_information_classes_replace(self, name, levels, hit_dice, source_book, index):
        update_class = {
            'name': name,
            'levels': levels,
            'hit_dice': hit_dice,
            'source_book': source_book
        }

        self.information_classes = self.field_text_list_replace(self.information_classes, update_class, index)
        self.save()

    def field_text_list_battle_attacks_add(self, name, key_ability_name, bonus_others, damage, critical, attack_type, attack_range, ammunition, notes, index='append'):      
        new_attack = {
            'name': name,
            'key_ability_name': key_ability_name,
            'bonus_total': self.formula_battle_attacks_bonus_total(key_ability_name, bonus_others),
            'bonus_others': bonus_others,
            'damage': damage,
            'critical': critical,
            'attack_type': attack_type,
            'attack_range': attack_range,
            'ammunition': ammunition,
            'notes': notes
        }

        self.battle_attacks = self.field_text_list_add(self.battle_attacks, new_attack, index=index)
        self.save()

    def field_text_list_battle_attacks_pop(self, index='first'):
        self.battle_attacks = self.field_text_list_pop(self.battle_attacks, index=index)
        self.save()

    def field_text_list_battle_attacks_replace(self, name, key_ability_name, bonus_others, damage, critical, attack_type, attack_range, ammunition, notes, index='append'):
        update_attack = {
            'name': name,
            'key_ability_name': key_ability_name,
            'bonus_total': self.formula_battle_attacks_bonus_total(key_ability_name, bonus_others),
            'bonus_others': bonus_others,
            'damage': damage,
            'critical': critical,
            'attack_type': attack_type,
            'attack_range': attack_range,
            'ammunition': ammunition,
            'notes': notes
        }

        self.battle_attacks = self.field_text_list_replace(self.battle_attacks, update_attack, index)
        self.save()

    def field_text_list_battle_attacks_update_all(self):
        attack_list = self.field_text_list_to_list(getattr(self, 'battle_attacks'))

        for i in range(len(attack_list)):
            key_ability_name = attack_list[i]['key_ability_name']
            bonus_others = attack_list[i]['bonus_others']

            attack_list[i]['bonus_total'] = self.formula_battle_attacks_bonus_total(key_ability_name, bonus_others)
        
        self.battle_attacks = self.field_text_list_from_list(attack_list)
        self.save()
        
    def field_text_list_inventory_equipments_add(self, name, description, item_type, armor_class_bonus, max_dexterity, max_speed, check_penalty, spell_failure, weight, price, special_properties, is_using, index='append'):
        new_equipment = {
            'name': name, 'description': description, 'item_type': item_type,
            'armor_class_bonus': armor_class_bonus,
            'max_dexterity': max_dexterity,
            'max_speed': max_speed,
            'check_penalty': check_penalty,
            'spell_failure': spell_failure,
            'weight': weight,
            'price': price,
            'special_properties': special_properties,
            'is_using': is_using
        }

        self.inventory_equipments = self.field_text_list_add(self.inventory_equipments, new_equipment, index=index)
        self.save()
        self.update_inventory_weight_current()
        self.update_battle_ca_equipment_armor()

    def field_text_list_inventory_equipments_pop(self, index='first'):
        self.inventory_equipments = self.field_text_list_pop(self.inventory_equipments, index=index)
        self.save()
        self.update_inventory_weight_current()
        self.update_battle_ca_equipment_armor()

    def field_text_list_inventory_equipments_replace(self, name, description, item_type, armor_class_bonus, max_dexterity, max_speed, check_penalty, spell_failure, weight, price, special_properties, is_using, index='append'):
        update_equipment = {
            'name': name, 'description': description, 'item_type': item_type,
            'armor_class_bonus': armor_class_bonus,
            'max_dexterity': max_dexterity,
            'max_speed': max_speed,
            'check_penalty': check_penalty,
            'spell_failure': spell_failure,
            'weight': weight,
            'price': price,
            'special_properties': special_properties,
            'is_using': is_using
        }

        self.inventory_equipments = self.field_text_list_replace(self.inventory_equipments, update_equipment, index)
        self.save()
        self.update_inventory_weight_current()
        self.update_battle_ca_equipment_armor()

    def field_text_list_inventory_possessions_add(self, name, group, description, weight, price, index='append'):
        # Nota: group definirá a que tipo de grupo uma posse pertence, podendo ser riches, supplies ou others
        possession = {
            'name': name, 'group': group, 'description': description, 'weight': weight, 'price': price
        }

        self.inventory_possessions = self.field_text_list_add(self.inventory_possessions, possession, index=index)
        self.save()
        self.update_inventory_weight_current()

    def field_text_list_inventory_possessions_pop(self, index='first'):
        self.inventory_possessions = self.field_text_list_pop(self.inventory_possessions, index=index)
        self.save()
        self.update_inventory_weight_current()

    def field_text_list_inventory_possessions_replace(self, name, group, description, weight, price, index='append'):
        # Nota: group definirá a que tipo de grupo uma posse pertence, podendo ser riches, supplies ou others
        possession = {
            'name': name, 'group': group, 'description': description, 'weight': weight, 'price': price
        }

        self.inventory_possessions = self.field_text_list_replace(self.inventory_possessions, possession, index)
        self.save()
        self.update_inventory_weight_current()



        