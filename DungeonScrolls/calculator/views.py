from django.shortcuts import render
from .forms import FormSelectRuleSystem


def experience_points(request):
    context = {}
    rule_system = request.GET.get('rule_system')

    if rule_system:
        context['form'] = FormSelectRuleSystem(rule_system.name)

    return render(request, 'calculator/experience_points.html', context)
