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

            # Obtem o objeto do RuleSystem relativo ao ID enviado pela request:
            rule_system_selected = RuleSystem.objects.get(pk=data['rule_system_selected_id'])

            # Obtem o Query Set Django apenas dos ExperiencePointsReceived que possuam a chave do RuleSystem escolhido:
            experience_points_received = ExperiencePointsReceived.objects.filter(rule_system=rule_system_selected)

            if data['response_type'] == 'calculator_formulary' and data['rule_system_selected_id']:
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

            elif data['response_type'] == 'calculator_result' and data['rule_system_selected_id']:
                corrected_data = {}

                for key in data:
                    if 'calculator_formulary_data[difficulty_levels_values]' in key:
                        # QueryDicts aninhados geram problema na conversão de JSON para um dicionário em Python, pois eles tentam
                        # converter tudo à apenas um nível de dicionário, então para contornar isso é preciso fazer a gambiarra
                        # abaixo para obter a verdadeira chave desejada (pois o dicionário gerado, mesmo em apenas um nível,
                        # segue um padrão lógico)
                        real_key_of_difficulty_levels_values = key[len('calculator_formulary_data[difficulty_levels_values]')+1:len(key)-1]

                        corrected_data[real_key_of_difficulty_levels_values] = data[key]

                all_character_level = []

                for model_object in experience_points_received:
                    if model_object.character_level not in all_character_level:
                        all_character_level.append(model_object.character_level)

                experience_points_per_level = {}
                amount_of_experience = 0

                for character_level in all_character_level:
                    for difficulty_level in corrected_data:
                        experience_information = ExperiencePointsReceived.objects.filter(rule_system=rule_system_selected,
                                                                                         difficulty_level=difficulty_level,
                                                                                         character_level=character_level)
                        number_of_enemies = float(corrected_data[difficulty_level])
                        amount_of_experience += float(experience_information.values_list('experience_received')[0][0]) * number_of_enemies

                    amount_of_experience = amount_of_experience/float(data['calculator_formulary_data[number_of_characters]'])
                    experience_points_per_level[character_level] = int(amount_of_experience)
                    amount_of_experience = 0

                response_data['experience_points_per_level'] = experience_points_per_level

        response_data = json.dumps(response_data)

        if self.request.is_ajax():
            return HttpResponse(response_data, content_type='application/json')
