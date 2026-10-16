from django.shortcuts import render


# Create your views here.
def usuarios(request):
    return render (request, 'usuarios/usuario.html')

def login(request):
    return render(request, 'usuarios/login.html')

def cadastro(request):
    return render(request, 'usuarios/cadastro.html')