from django.shortcuts import render

def settings_page(request):
    return render(request, 'settings_page/settings_page.html')

