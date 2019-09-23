from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth.models import User
from rule_system.models import RuleSystem
from sheets.models import Bestiary, Chapter, Sheet, SheetDnD35


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RuleSystemSerializer(ModelSerializer):
    class Meta:
        model = RuleSystem
        fields = '__all__'


class BestiarySerializer(ModelSerializer):
    class Meta:
        model = Bestiary
        fields = '__all__'


class ChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'


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
    # Specific Text List Attributes that need special treatment:
    information_classes = SerializerMethodField()
    battle_attacks = SerializerMethodField()
    inventory_equipments = SerializerMethodField()
    inventory_possessions = SerializerMethodField()
    talents_skills = SerializerMethodField()
    
    class Meta:
        model = SheetDnD35
        fields = '__all__'
        
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

    

    
