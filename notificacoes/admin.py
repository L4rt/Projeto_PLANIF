from django.contrib import admin

from .models import ConfiguracaoNotificacao, Notificacao


class ConfiguracaoNotificacaoAdmin(admin.ModelAdmin):
    list_display = ('configuracao_usuario', 'antecedencia', 'ativa')
    list_filter = ('ativa',)


class NotificacaoAdmin(admin.ModelAdmin):
    list_display = ('mensagem', 'compromisso', 'data_envio', 'status')
    list_filter = ('status',)
    search_fields = ('mensagem',)


admin.site.register(ConfiguracaoNotificacao, ConfiguracaoNotificacaoAdmin)
admin.site.register(Notificacao, NotificacaoAdmin)

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'