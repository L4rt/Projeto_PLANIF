from django.urls import path
from . import views

urlpatterns = [
    path('usuarios/', views.usuarios , name="usuarios"),
    
    path('login/', views.login , name="login"),
    
    path('cadastro/', views.cadastro , name="cadastro"),
]
