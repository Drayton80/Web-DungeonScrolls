from django.shortcuts import render
from django.views.generic import TemplateView
from django.core import serializers
from .forms import SelectRuleSystemForm, ExperiencePointsCalculatorForm
from .models import RuleSystem, ExperiencePointsReceived


class ExperienceCalculatorView(TemplateView):
    template_path = 'calculator/experience_points.html'

    def get(self, request, *args, **kwargs):
        # Instancia um Objeto Form para poder utilizar dos formulários já prontos fornecidos pelo Django:
        model_choice_form = SelectRuleSystemForm()

        # Coloca-se tudo em um dicionário que
        context = {'model_choice_form': model_choice_form}

        return render(request, self.template_path, context)

    def post(self, request):
        model_choice_form = SelectRuleSystemForm()
        integer_form = ExperiencePointsCalculatorForm()
        context = {}

        if request.POST:
            data_json = request.POST
            data = dict(data_json.items())

            if data['rule_system_selected_id']:
                # Obtem o objeto do RuleSystem relativo ao ID enviado pela request:
                rule_system_selected = RuleSystem.objects.get(pk=data['rule_system_selected_id'])

                # Obtem o Query Set Django apenas dos ExperiencePointsReceived que possuam a chave do RuleSystem escolhido:
                experience_points_received = ExperiencePointsReceived.objects.filter(rule_system=rule_system_selected)
                # Transforma os Querysets Models do Django em JSON para enviá-los via request:
                context['experience_points_received'] = serializers.serialize('json', experience_points_received)

        context['model_choice_form'] = model_choice_form
        context['integer_form'] = integer_form
        context['text'] = 'text'

        print(context['integer_form'])

        return render(request, self.template_path, context)

