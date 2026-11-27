from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import ConfiguracaoUsuario, Usuario


# O Usuario precisa de uma classe própria porque o login é por e-mail
# (não existe username) e a senha precisa ser salva com hash.
class UsuarioAdmin(UserAdmin):
    ordering = ('email',)
    list_display = ('email', 'nome', 'tipo', 'is_staff')
    list_filter = ('tipo', 'is_staff', 'is_active')
    search_fields = ('email', 'nome')

    # Tela de edição de um usuário existente
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Dados pessoais', {'fields': ('nome', 'tipo')}),
        ('Permissões', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                   'groups', 'user_permissions')}),
        ('Datas', {'fields': ('last_login', 'date_joined')}),
    )

    # Tela de criação de um usuário novo
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nome', 'tipo', 'password1', 'password2'),
        }),
    )


admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(ConfiguracaoUsuario)