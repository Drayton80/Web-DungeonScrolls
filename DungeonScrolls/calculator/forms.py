from django import forms
from .models import RuleSystem, ExperiencePointsReceived


class SelectRuleSystemForm(forms.Form):
    rule_system = forms.ModelChoiceField(
        queryset=RuleSystem.objects.all(),
        label="RPG Rule System",
        empty_label="Choose one of the systems below",
        required=False,
        widget=forms.Select(attrs={"id": "rule_system",
                                   "onChange": "generate_experience_calculator_formulary(this.id, 'experience_calculator_formulary')"})
    )


class ExperiencePointsCalculatorForm(forms.Form):
    experience_points_calculator = forms.CharField(
        label="TEst",
        initial="0",
        required=False
    )
