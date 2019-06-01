from django.shortcuts import render
from django.views.generic import TemplateView
from .forms import SelectRuleSystemForm


class ExperienceCalculatorView(TemplateView):
    template_path = 'calculator/experience_points.html'

    def get(self, request, *args, **kwargs):
        form = SelectRuleSystemForm()
        context = {'form': form}

        return render(request, self.template_path, context)

    def post(self, request):
        form = SelectRuleSystemForm(request.POST)
        context = {'form': form}

        if form.is_valid():
            rule_system_selected = form.cleaned_data['rule_system']

            context['rule_system_selected'] = rule_system_selected

        return render(request, self.template_path, context)

