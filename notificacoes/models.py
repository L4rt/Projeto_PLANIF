from django.core.mail import send_mail
from django.db import models

class ConfiguracaoNotificacao(models.Model):

    # Cada ConfiguracaoUsuario possui uma ConfiguracaoNotificacao (1..1)
    configuracao_usuario = models.OneToOneField(
        'usuarios.ConfiguracaoUsuario',
        on_delete=models.CASCADE,
        related_name='notificacao',
    )

    # RF11: antecedência do lembrete, em minutos
    antecedencia = models.PositiveIntegerField(
        default=30,
        help_text='Minutos de antecedência do lembrete.',
    )
    ativa = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Configuração de notificação'
        verbose_name_plural = 'Configurações de notificação'

    def __str__(self):
        return f'Notificações de {self.configuracao_usuario.usuario.nome}'

    def alterar_antecedencia(self, minutos):
        self.antecedencia = minutos
        self.save(update_fields=['antecedencia'])

    def ativar(self):
        self.ativa = True
        self.save(update_fields=['ativa'])

    def desativar(self):
        self.ativa = False
        self.save(update_fields=['ativa'])
        
class Notificacao(models.Model):

    class Status(models.TextChoices):
        PENDENTE = 'PENDENTE', 'Pendente'
        ENVIADA = 'ENVIADA', 'Enviada'
        CANCELADA = 'CANCELADA', 'Cancelada'

    # Um compromisso pode gerar várias notificações
    compromisso = models.ForeignKey(
        'agenda.Compromisso',
        on_delete=models.CASCADE,
        related_name='notificacoes',
    )

    # Configuração que originou o lembrete
    configuracao = models.ForeignKey(
        ConfiguracaoNotificacao,
        on_delete=models.CASCADE,
        related_name='notificacoes',
    )

    # Momento em que a notificação deve ser enviada
    data_envio = models.DateTimeField()
    mensagem = models.CharField(max_length=255)
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.PENDENTE,
    )

    class Meta:
        verbose_name = 'Notificação'
        verbose_name_plural = 'Notificações'
        ordering = ['data_envio']

    def __str__(self):
        return f'{self.mensagem} [{self.get_status_display()}]'

    def marcar_enviada(self):
        self.status = self.Status.ENVIADA
        self.save(update_fields=['status'])

    def cancelar(self):
        self.status = self.Status.CANCELADA
        self.save(update_fields=['status'])

    def enviar(self):
        """Envia o lembrete por e-mail ao dono do compromisso."""
        if self.status != self.Status.PENDENTE:
            return False

        send_mail(
            subject='PLANIF - Lembrete',
            message=self.mensagem,
            from_email=None,  # usa DEFAULT_FROM_EMAIL
            recipient_list=[self.compromisso.usuario.email],
        )
        self.marcar_enviada()
        return True
    