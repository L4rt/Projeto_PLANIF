from django.contrib import admin

from .models import Evento, SubTarefa, Tarefa


# Permite editar as subtarefas dentro da própria tela da tarefa
class SubTarefaInline(admin.TabularInline):
    model = SubTarefa
    extra = 1


class EventoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'usuario', 'data', 'horario', 'prioridade')
    list_filter = ('prioridade', 'data')
    search_fields = ('titulo', 'descricao', 'usuario__email')


class TarefaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'usuario', 'data', 'horario', 'prioridade', 'concluida')
    list_filter = ('concluida', 'prioridade', 'data')
    search_fields = ('titulo', 'descricao', 'usuario__email')
    inlines = [SubTarefaInline]


admin.site.register(Evento, EventoAdmin)
admin.site.register(Tarefa, TarefaAdmin)