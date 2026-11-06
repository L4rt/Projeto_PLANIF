
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager


# Gerenciador responsável pela criação dos usuários
class UsuarioManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError('O usuário deve possuir um e-mail.')

        email = self.normalize_email(email)

        usuario = self.model(
            email=email,
            **extra_fields
        )

        usuario.set_password(password)
        usuario.save(using=self._db)

        return usuario

    def create_superuser(self, email, password=None, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(email, password, **extra_fields)


# Classe Usuario
class Usuario(AbstractUser):

    username = None

    objects = UsuarioManager()

    nome = models.CharField(max_length=150)

    class TipoUsuario(models.TextChoices):
        ALUNO = 'ALUNO', 'Aluno'
        PROFESSOR = 'PROFESSOR', 'Professor'

    email = models.EmailField(unique=True)

    tipo = models.CharField(
        max_length=15,
        choices=TipoUsuario.choices,
        default=TipoUsuario.ALUNO
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome']

    def __str__(self):
        return self.nome


# Classe ConfiguracaoUsuario
class ConfiguracaoUsuario(models.Model):

    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='configuracoes'
    )

    tema = models.CharField(
        max_length=10,
        default='claro'
    )

    fuso_horario = models.CharField(
        max_length=50,
        default='America/Sao_Paulo'
    )

    def __str__(self):
        return f'Configurações de {self.usuario.nome}'
