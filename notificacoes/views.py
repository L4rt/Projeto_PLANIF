from django.shortcuts import render

# Create your views here.
def notificacoes(request):
    return render (request, 'notificacoes/notificacoes.html')