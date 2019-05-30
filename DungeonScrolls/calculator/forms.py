from django import forms
from .models import RuleSystem


class FormSelectRuleSystem(forms.Form):
    #rule_system = forms.ModelChoiceField(queryset=RuleSystem.objects.all(), label='Sistema de Regras',)
    #rule_system = forms.ModelChoiceField(queryset=RuleSystem.objects.all(), label='Sistema de Regras', )

    class Meta:
        fields = ('rule_system', '')

    def __init__(self, rule_system_name, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields['rule_system'].queryset = RuleSystem.objects.filter(name=rule_system_name)
