from django.conf import settings
from django.db import models
from django.utils import timezone

class Compromisso(models.Model):

    class Prioridade(models.TextChoices):
        BAIXA = 'BAIXA', 'Baixa'
        MEDIA = 'MEDIA', 'Média'
        ALTA = 'ALTA', 'Alta'

    # Um usuário possui vários compromissos (RN01: cada um vê só os seus)
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='compromissos',
    )

    # RN02: título, data e horário são obrigatórios
    titulo = models.CharField(max_length=60)
    descricao = models.TextField(blank=True)
    data = models.DateField()
    horario = models.TimeField()
    prioridade = models.CharField(
        max_length=10,
        choices=Prioridade.choices,
        default=Prioridade.MEDIA,
    )

    class Meta:
        ordering = ['data', 'horario']

    def __str__(self):
        return f'{self.titulo} ({self.data:%d/%m/%Y} {self.horario:%H:%M})'
    
class Evento(Compromisso):

    class Meta:
        verbose_name = 'Evento'
        verbose_name_plural = 'Eventos'
        
class Tarefa(Compromisso):

    # RF06: marcar como concluída mantendo o histórico
    concluida = models.BooleanField(default=False)
    data_conclusao = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Tarefa'
        verbose_name_plural = 'Tarefas'

    def concluir(self):
        self.concluida = True
        self.data_conclusao = timezone.now()
        self.save(update_fields=['concluida', 'data_conclusao'])

    def reabrir(self):
        self.concluida = False
        self.data_conclusao = None
        self.save(update_fields=['concluida', 'data_conclusao'])
        
class SubTarefa(models.Model):

    # Composição: se a tarefa for apagada, as subtarefas também são
    tarefa = models.ForeignKey(
        Tarefa,
        on_delete=models.CASCADE,
        related_name='subtarefas',
    )
    titulo = models.CharField(max_length=60)
    concluida = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Subtarefa'
        verbose_name_plural = 'Subtarefas'

    def __str__(self):
        return self.titulo