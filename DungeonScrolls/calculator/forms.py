from django import forms
from .models import RuleSystem


class SelectRuleSystemForm(forms.Form):
    rule_system = forms.ModelChoiceField(
        queryset=RuleSystem.objects.all(),
        label="RPG Rule System",
        empty_label="Choose one of the systems below",
        required=False,
        widget=forms.Select(attrs={"onChange": 'test()'})
    )
