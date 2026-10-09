from django.urls import path
from . import views

urlpatterns = [
    path('notificacoes/', views.notificacoes , name="notificacoes")
]