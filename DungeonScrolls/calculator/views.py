from django.shortcuts import render
from django.views.generic import TemplateView, View
from django.core import serializers
from django.views.generic.detail import BaseDetailView, SingleObjectTemplateResponseMixin
from django.http import HttpResponse

from .forms import SelectRuleSystemForm, ExperiencePointsCalculatorForm
from .models import RuleSystem, ExperiencePointsReceived

import json

class ExperienceCalculatorView(SingleObjectTemplateResponseMixin, BaseDetailView):
    template_name = 'calculator/experience_points.html'

    def get(self, request):
        # Instancia um Objeto Form para poder utilizar dos formulários já prontos fornecidos pelo Django:
        model_choice_form = SelectRuleSystemForm()

        # Coloca-se tudo em um dicionário que
        context = {'model_choice_form': model_choice_form}

        return render(request, self.template_name, context)

    def post(self, request):
        response_data = {}
        difficulty_level_information = {}

        if request.POST:
            data_json = request.POST
            data = dict(data_json.items())

            if data['rule_system_selected_id']:
                # Obtem o objeto do RuleSystem relativo ao ID enviado pela request:
                rule_system_selected = RuleSystem.objects.get(pk=data['rule_system_selected_id'])

                # Obtem o Query Set Django apenas dos ExperiencePointsReceived que possuam a chave do RuleSystem escolhido:
                experience_points_received = ExperiencePointsReceived.objects.filter(rule_system=rule_system_selected)

                all_difficulty_levels = []
                all_difficulty_levels_text = ""

                for model_object in experience_points_received:
                    if model_object.difficulty_level not in all_difficulty_levels:
                        all_difficulty_levels.append(model_object.difficulty_level)

                for level in all_difficulty_levels:
                    all_difficulty_levels_text += "," + level

                all_difficulty_levels_text = all_difficulty_levels_text.replace(",", "", 1)

                difficulty_level_information["prefix"] = "CR"
                difficulty_level_information["all_levels"] = all_difficulty_levels_text

            response_data['difficulty_level_information'] = difficulty_level_information
            response_data['rule_system_selected_id'] = data['rule_system_selected_id']

        response_data = json.dumps(response_data)

        if self.request.is_ajax():
            return HttpResponse(response_data, content_type='application/json')
