from django.urls import path
from . import views

urlpatterns = [
    path('usuarios/', views.usuarios , name="usuarios"),
    
    path('', views.login , name="login"),
    
    path('cadastro/', views.cadastro , name="cadastro"),
]
