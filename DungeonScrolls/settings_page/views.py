from django.views.generic.detail import BaseDetailView, SingleObjectTemplateResponseMixin
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
import json

class SettingsPage(SingleObjectTemplateResponseMixin, BaseDetailView):
    template_name = 'settings_page/settings_page.html'
    
    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        response_data = {}
        response_data['error_message'] = None

        if request.POST:
            data_json = request.POST
            data = dict(data_json.items())

            user = User.objects.get(pk=data['user[id]'])
            change_type = data['change_type']

            if change_type == 'username':
                changed_username = data['user[username]']
                users_with_same_username = User.objects.filter(username=changed_username)

                if users_with_same_username:
                    response_data['error_message'] = 'Another user already has that username'
                else:
                    user.username = changed_username

            elif change_type == 'complete_name':
                user.first_name = data['user[first_name]']
                user.last_name  = data['user[last_name]']

            elif change_type == 'email':
                user.email      = data['user[email]']

            elif change_type == 'password':
                old_password = data['old_password']

                if check_password(old_password, user.password):
                    user.set_password(data['user[password]'])
                else:
                    response_data['error_message'] = 'You used a wrong password'


            if not response_data['error_message']:
                user.save()            

        
        response_data = json.dumps(response_data)

        if self.request.is_ajax():
            return HttpResponse(response_data, content_type='application/json')

