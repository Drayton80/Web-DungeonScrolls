from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from django.contrib.auth.models import User
from rule_system.models import RuleSystem
from sheets.models import Bestiary, Chapter, Sheet, SheetDnD35
import datetime


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RuleSystemSerializer(ModelSerializer):
    class Meta:
        model = RuleSystem
        fields = '__all__'


class BestiarySerializer(ModelSerializer):
    name = serializers.CharField(required=False)
    creation_date = serializers.DateField(required=False)
    owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Bestiary
        fields = '__all__'

    def get_validation_exclusions(self):
        exclusions = super(BestiarySerializer, self).get_validation_exclusions()
        return exclusions + ['creation_date', 'name', 'owner']
        
class ChapterSerializer(ModelSerializer):
    name = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    bestiary = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Chapter
        fields = '__all__'

    def get_validation_exclusions(self):
        exclusions = super(ChapterSerializer, self).get_validation_exclusions()
        return exclusions + ['name', 'description', 'bestiary']


class SheetListSerializer(ModelSerializer):
    rule_system = SerializerMethodField()
    
    class Meta:
        model = Sheet
        fields = ['id', 'name', 'sheet_type', 'rule_system', 'ancestral', 'chapter']

    def get_rule_system(self, obj):
        if obj.rule_system:
            return str(obj.rule_system.name)
        else:
            return None


class SheetDnD35Serializer(ModelSerializer):
    '''
    # Specific Text List Attributes that need special treatment:
    information_classes = SerializerMethodField()
    battle_attacks = SerializerMethodField()
    inventory_equipments = SerializerMethodField()
    inventory_possessions = SerializerMethodField()
    talents_skills = SerializerMethodField()
    '''

    # ATTRIBUTES:
    name = serializers.CharField(required=False)
    sheet_type = serializers.CharField(required=False)

    # RELATIONSHIPS::
    rule_system = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    #chapter = serializers.PrimaryKeyRelatedField(many=False, read_only=False)
    ancestral = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    # FIELDS:
    bigStringInventoryOthers = serializers.CharField(required=False)
    bigStringInventoryArmor = serializers.CharField(required=False)
    bigStringInventoryShield = serializers.CharField(required=False)
    bigStringAttacks = serializers.CharField(required=False)
    stringClass = serializers.CharField(required=False)
    bigStringSkills = serializers.CharField(required=False)

    information_name = serializers.CharField(required=False)
    information_classes = serializers.CharField(required=False)
    information_level = serializers.IntegerField(required=False)
    information_experience = serializers.IntegerField(required=False)
    information_race = serializers.CharField(required=False)
    information_gender = serializers.CharField(required=False)
    information_size = serializers.CharField(required=False)
    information_size_modifier_ca_and_attack = serializers.IntegerField(required=False)
    information_size_modifier_special_attacks = serializers.IntegerField(required=False)
    information_size_modifier_hide = serializers.IntegerField(required=False)
    information_age = serializers.CharField(required=False)
    information_alignment = serializers.CharField(required=False)
    information_deity = serializers.CharField(required=False)
    information_languages = serializers.CharField(required=False)
    
    ability_strength_base = serializers.IntegerField(required=False)
    ability_strength_modifier = serializers.IntegerField(required=False)
   
    ability_dexterity_base = serializers.IntegerField(required=False)
    ability_dexterity_modifier = serializers.IntegerField(required=False)

    ability_constitution_base = serializers.IntegerField(required=False)
    ability_constitution_modifier = serializers.IntegerField(required=False)

    ability_intelligence_base = serializers.IntegerField(required=False)
    ability_intelligence_modifier = serializers.IntegerField(required=False)

    ability_wisdom_base = serializers.IntegerField(required=False)
    ability_wisdom_modifier = serializers.IntegerField(required=False)

    ability_charisma_base = serializers.IntegerField(required=False)
    ability_charisma_modifier = serializers.IntegerField(required=False)

    saving_throws_fortitude_total = serializers.IntegerField(required=False)
    saving_throws_fortitude_base = serializers.IntegerField(required=False)
    saving_throws_fortitude_temporary = serializers.IntegerField(required=False)
    saving_throws_fortitude_others = serializers.IntegerField(required=False)

    saving_throws_reflex_total = serializers.IntegerField(required=False)
    saving_throws_reflex_base = serializers.IntegerField(required=False)
    saving_throws_reflex_temporary = serializers.IntegerField(required=False)
    saving_throws_reflex_others = serializers.IntegerField(required=False)

    saving_throws_will_total = serializers.IntegerField(required=False)
    saving_throws_will_base = serializers.IntegerField(required=False)
    saving_throws_will_temporary = serializers.IntegerField(required=False)
    saving_throws_will_others = serializers.IntegerField(required=False)

    battle_speed = serializers.CharField(required=False)
    battle_initiative_total = serializers.IntegerField(required=False)
    battle_initiative_others = serializers.IntegerField(required=False)
    battle_hp_total = serializers.IntegerField(required=False)
    battle_hp_current = serializers.IntegerField(required=False)
    battle_hp_nonlethal = serializers.IntegerField(required=False)
    battle_ca_total = serializers.IntegerField(required=False)
    battle_ca_touch = serializers.IntegerField(required=False)
    battle_ca_flat_footed = serializers.IntegerField(required=False)
    battle_ca_equipment_armor = serializers.IntegerField(required=False)
    battle_ca_natural_armor = serializers.IntegerField(required=False)
    battle_ca_deflection_modifier = serializers.IntegerField(required=False)
    battle_ca_other_modifier = serializers.IntegerField(required=False)
    battle_damage_reduction = serializers.IntegerField(required=False)
    battle_spell_resistance = serializers.IntegerField(required=False)
    battle_base_attack_bonus = serializers.IntegerField(required=False)
    battle_grapple_total = serializers.IntegerField(required=False)
    battle_grapple_others = serializers.IntegerField(required=False)
    battle_attacks = serializers.CharField(required=False)
    battle_special_attacks = serializers.CharField(required=False)
    
    inventory_equipments = serializers.CharField(required=False)
    inventory_possessions = serializers.CharField(required=False)
    inventory_money = serializers.CharField(required=False)
    inventory_weight_current = serializers.IntegerField(required=False)
    inventory_weight_light = serializers.IntegerField(required=False)
    inventory_weight_medium = serializers.IntegerField(required=False)
    inventory_weight_heavy = serializers.IntegerField(required=False)
    inventory_weight_maximum = serializers.IntegerField(required=False)
    
    talents_skills = serializers.CharField(required=False)
    talents_feats = serializers.CharField(required=False)
    talents_special_abilities = serializers.CharField(required=False)

    magic_spells = serializers.CharField(required=False)
    magic_slots = serializers.CharField(required=False)
    magic_spell_save = serializers.IntegerField(required=False)
    magic_arcane_spell_failure = serializers.IntegerField(required=False)

    annotations_appearance = serializers.CharField(required=False)
    annotations_background = serializers.CharField(required=False)
    annotations_others = serializers.CharField(required=False)

    companion_pet_master = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    companion_leader = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    
    class Meta:
        model = SheetDnD35
        fields = '__all__'

    def get_validation_exclusions(self):
        exclusions = super(SheetDnD35Serializer, self).get_validation_exclusions()
        return exclusions + [
            'name', 'sheet_type', 'rule_system', 'ancestral', 'bigStringInventoryOthers', 'bigStringInventoryArmor',
            'bigStringInventoryShield', 'bigStringAttacks', 'stringClass', 'bigStringSkills', 'information_name', 'information_classes', 
            'information_level','information_experience', 'information_race', 'information_gender', 'information_size', 'information_size_modifier_ca_and_attack',
            'information_size_modifier_special_attacks', 'information_size_modifier_hide', 'rule_system', 'information_age', 'information_alignment', 
            'information_deity', 'information_languages', 'ability_strength_base', 'ability_strength_modifier', 'ability_dexterity_base', 
            'ability_dexterity_modifier', 'ability_constitution_base', 'ability_constitution_modifier', 'ability_intelligence_base', 
            'ability_intelligence_modifier', 'ability_wisdom_base', 'ability_wisdom_modifier', 'ability_charisma_base', 'ability_charisma_modifier',
            'saving_throws_fortitude_total', 'saving_throws_fortitude_base', 'saving_throws_fortitude_temporary', 'saving_throws_fortitude_others',
            'saving_throws_reflex_total', 'saving_throws_reflex_base', 'saving_throws_reflex_temporary', 'saving_throws_reflex_others',
            'saving_throws_will_total', 'saving_throws_will_base', 'saving_throws_will_temporary', 'saving_throws_will_others',
            'battle_speed', 'battle_initiative_total', 'battle_initiative_others', 'battle_hp_total', 'battle_hp_current', 
            'battle_hp_nonlethal', 'battle_ca_total', 'battle_ca_touch', 'battle_ca_flat_footed', 'battle_ca_equipment_armor', 
            'battle_ca_natural_armor', 'battle_ca_deflection_modifier', 'battle_ca_other_modifier', 'battle_damage_reduction', 
            'battle_spell_resistance', 'battle_base_attack_bonus', 'battle_grapple_total', 'battle_grapple_others', 
            'battle_attacks', 'battle_special_attacks', 'inventory_equipments', 'inventory_possessions', 'inventory_money', 
            'inventory_weight_current', 'inventory_weight_light', 'inventory_weight_medium', 'inventory_weight_heavy', 'inventory_weight_maximum',
            'talents_skills', 'talents_feats', 'talents_special_abilities', 'magic_spells', 'magic_slots', 'magic_spell_save',
            'magic_arcane_spell_failure', 'annotations_appearance', 'annotations_background', 'annotations_others',
            'companion_pet_master', 'companion_leader']

    '''
    def get_information_classes(self, obj):
        return str(obj.field_text_list_information_classes_get())

    def get_battle_attacks(self, obj):
        return str(obj.field_text_list_battle_attacks_get())

    def get_inventory_equipments(self, obj):
        return str(obj.field_text_list_inventory_equipments_get())

    def get_inventory_possessions(self, obj):
        return str(obj.field_text_list_inventory_possessions_get())

    def get_talents_skills(self, obj):
        return str(obj.field_text_list_talents_skills_get())
    '''

    

    
