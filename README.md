# 1. Título do projeto

**Planejamento Integrado do IF (PLANIF)**

---

# 2. Descrição

O **PLANIF** é um sistema web de gerenciamento de agenda desenvolvido para auxiliar na organização de compromissos, eventos e tarefas de alunos e professores do IFRN – Campus São Gonçalo do Amarante.

**Problema que busca resolver:** muitos estudantes e professores ainda organizam sua rotina com agendas físicas, anotações dispersas ou aplicativos genéricos, que não atendem ao contexto escolar. Isso contribui para o esquecimento de prazos, o acúmulo de tarefas e a dificuldade de planejar a rotina acadêmica.

**Propósito:** centralizar as atividades dos usuários em um único ambiente, permitindo acompanhar compromissos de forma prática e organizada, com mais produtividade e controle das atividades diárias.

> Projeto desenvolvido para o componente curricular *Projeto de Desenvolvimento de Software* do Curso Técnico em Informática do IFRN – Campus São Gonçalo do Amarante, sob orientação da professora Camila Taumaturgo.

---

# 3. Objetivos

- Facilitar a organização de compromissos e atividades.
- Permitir o gerenciamento de eventos e tarefas.
- Proporcionar uma visualização organizada dos compromissos.
- Auxiliar no planejamento da rotina dos usuários.
- Disponibilizar notificações para acompanhamento das atividades.

---

# 4. Funcionalidades

O PLANIF possui três módulos principais, organizados de acordo com os requisitos funcionais (RF) especificados.

**Legenda de status:** ✅ Disponível | 🕒 Prevista (ainda não disponível)

### 4.1 Módulo de Usuário

| Código | Funcionalidade | Descrição | Status |
|--------|----------------|-----------|--------|
| RF01 | Cadastrar usuário | Permite o cadastro de alunos e professores por meio de informações básicas, como nome, e-mail e senha. | 🕒 Prevista |
| RF02 | Fazer login | Permite a autenticação segura por e-mail e senha para acesso ao sistema. | 🕒 Prevista |
| RF03 | Recuperar senha | Permite solicitar a redefinição de senha, recebendo instruções no e-mail cadastrado. | 🕒 Prevista |

### 4.2 Módulo de Eventos e Tarefas

| Código | Funcionalidade | Descrição | Status |
|--------|----------------|-----------|--------|
| RF04 | Gerenciar eventos e tarefas | Permite criar, editar e excluir eventos e tarefas, com título, descrição, data, horário e prioridade. | 🕒 Prevista |
| RF05 | Organizar tarefas | Permite classificar e organizar as atividades por critérios como prioridade e prazo. | 🕒 Prevista |
| RF06 | Marcar tarefas como concluídas | Permite alterar o status da tarefa para concluída, mantendo o histórico das atividades executadas. | 🕒 Prevista |
| RF07 | Visualizar agenda | Disponibiliza a visualização dos compromissos nos formatos diário, semanal e mensal. | 🕒 Prevista |

### 4.3 Módulo de Pesquisa e Notificação

| Código | Funcionalidade | Descrição | Status |
|--------|----------------|-----------|--------|
| RF08 | Pesquisar eventos | Permite pesquisar e filtrar eventos e tarefas por data, prioridade, categoria ou palavras-chave no título ou descrição. | 🕒 Prevista |
| RF09 | Exibir resumo diário de compromissos | Apresenta, após o login, os compromissos e tarefas programados para o dia atual. | 🕒 Prevista |
| RF10 | Enviar notificação | Informa os usuários sobre compromissos e prazos próximos por meio de lembretes automáticos. | 🕒 Prevista |
| RF11 | Personalizar notificações | Permite configurar a forma e o momento de recebimento dos lembretes, incluindo a antecedência. | 🕒 Prevista |

---

# 5. Tecnologias utilizadas

O desenvolvimento do PLANIF utiliza tecnologias voltadas à construção de aplicações web, organização de dados e desenvolvimento de interfaces.

### Linguagens, framework e banco de dados

- **HTML:** estruturação das páginas.
- **CSS:** estilização e responsividade das interfaces.
- **JavaScript:** implementação de interatividade nas telas.
- **Python:** processamento das informações e implementação das regras de negócio.
- **Django:** framework web.
- **MySQL:** armazenamento e gerenciamento dos dados.

### Ferramentas

- **Visual Studio Code (VS Code):** ambiente de desenvolvimento.
- **Figma:** prototipação das interfaces.
- **Lucidchart:** elaboração dos diagramas do sistema.
- **Canva:** criação de materiais gráficos.

### Metodologia e modelagem

- **Scrum:** metodologia ágil adotada para organização das atividades.
- **UML:** linguagem utilizada para representação e modelagem do sistema.

---

# 6. Pré-requisitos

**Configuração recomendada — novembro de 2026**

| Software / Tecnologia | Versão recomendada | Finalidade |
|-----------------------|--------------------|------------|
| Windows | 10 ou 11 (64 bits) | Sistema operacional |
| Visual Studio Code | Versão estável atual | Ambiente de desenvolvimento |
| Python | 3.13.17 | Linguagem do back-end |
| Django | 6.1.3 | Framework web |
| pip | Versão atual | Instalação de dependências Python |
| MySQL Server | 8.4 LTS | Banco de dados |
| HTML | HTML5 | Estrutura das páginas |
| CSS | CSS3 | Estilização das páginas |
| JavaScript | ECMAScript 2023 ou superior | Interatividade das páginas |

> As versões de Python e Django são compatíveis entre si.

> **Importante:** HTML5, CSS3 e JavaScript não precisam ser instalados separadamente, pois são interpretados pelo navegador. Também não é necessário instalar o Node.js, já que o projeto utiliza apenas JavaScript puro, sem ferramentas adicionais.

**Além dos programas acima, recomenda-se:**

- Extensão **Python**, da Microsoft, no VS Code.
- Extensão **Pylance**, para suporte e análise de código Python.
- Ambiente virtual Python (**venv**), para isolamento das dependências.
- Navegador atualizado, como Google Chrome, Microsoft Edge ou Firefox.

---

# 7. Instalação e execução

Para executar o PLANIF em outra máquina, é necessário instalar e configurar os softwares utilizados no desenvolvimento. Siga as etapas abaixo.

### 7.1 Instalação dos programas necessários

- **Python:** [https://www.python.org/downloads/](https://www.python.org/downloads/)
- **Visual Studio Code:** [https://code.visualstudio.com/](https://code.visualstudio.com/)
- **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **MySQL Server:** [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
- **Navegador:** Google Chrome, Microsoft Edge ou Firefox.

> Durante a instalação do Python no Windows, marque a opção **Add Python to PATH**.

### 7.2 Verificar as instalações

Abra o terminal do Windows ou do VS Code e execute:

```bash
python --version
git --version
pip --version
```

Esses comandos verificam se Python, Git e pip foram instalados corretamente.

### 7.3 Clonar o repositório

Substitua a URL pelo endereço do repositório do PLANIF no GitHub:

```bash
git clone URL_DO_REPOSITORIO
cd PLANIF
```

### 7.4 Abrir o projeto no Visual Studio Code

Dentro da pasta do projeto, execute:

```bash
code .
```

Também é possível abrir o VS Code manualmente e selecionar **File → Open Folder**, escolhendo a pasta do PLANIF.

### 7.5 Criar o ambiente virtual

O ambiente virtual permite instalar as dependências do projeto sem interferir em outras aplicações Python do computador.

```bash
python -m venv venv
```

Para ativar no Windows:

```bash
venv\Scripts\activate
```

Após a ativação, o terminal exibirá `(venv)` antes do caminho atual.

### 7.6 Instalar as dependências

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

O arquivo `requirements.txt` contém as bibliotecas e as versões utilizadas pela aplicação.

### 7.7 Configurar o banco de dados MySQL

1. Abra o MySQL e acesse o servidor com suas credenciais.
2. Crie o banco de dados do PLANIF, respeitando o nome configurado no projeto:

```sql
CREATE DATABASE planif
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

3. Abra o arquivo `settings.py` do projeto Django e localize a configuração `DATABASES`.
4. Informe o nome do banco, usuário, senha e endereço do servidor:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'planif',
        'USER': 'root',
        'PASSWORD': 'sua_senha',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

> **Observação:** os dados acima são exemplos. Utilize as credenciais configuradas no seu computador e mantenha a configuração compatível com o projeto.

### 7.8 Preparar o banco de dados

Com o ambiente virtual ativado e o banco configurado, execute:

```bash
python manage.py makemigrations
python manage.py migrate
```

Esses comandos criam a estrutura do banco de dados de acordo com os modelos definidos na aplicação Django.

### 7.9 Criar um usuário administrador (opcional)

Para acessar a área administrativa do Django:

```bash
python manage.py createsuperuser
```

Preencha as informações solicitadas pelo terminal.

### 7.10 Executar o projeto

```bash
python manage.py runserver
```

Se tudo estiver correto, o terminal indicará que o servidor está em execução. Abra o navegador e acesse:

**http://127.0.0.1:8000/**

### 7.11 Encerrar a execução

- Para interromper o servidor, pressione `CTRL + C` no terminal.
- Para desativar o ambiente virtual, execute:

```bash
deactivate
```

> Para executar novamente, acesse a pasta do projeto, ative o ambiente virtual e inicie o servidor com `python manage.py runserver`.

---

# 8. Estrutura do projeto

O PLANIF segue a estrutura do framework Django, separando os módulos da aplicação, os arquivos estáticos e os templates da interface.

```text
PROJETO_PLANIF/
│
├── agenda/            # Módulo de eventos, tarefas e compromissos
├── notificacoes/      # Módulo de notificações e lembretes
├── setup/             # Arquivos de configuração do projeto
├── usuarios/          # Cadastro, gerenciamento de usuários e autenticação
│
├── static/
│   ├── css/           # Estilização das páginas
│   ├── img/           # Imagens utilizadas na aplicação
│   └── js/            # Scripts de interatividade das páginas
│
├── templates/
│   ├── agenda/        # Templates do módulo de agenda
│   ├── notificacoes/  # Templates de notificações
│   ├── usuarios/      # Templates de usuários
│   └── base.html      # Template-base compartilhado pelas páginas
│
├── .gitignore         # Arquivos e diretórios ignorados pelo Git
├── manage.py          # Comandos administrativos do Django
├── requirements.txt   # Dependências Python do projeto
└── texto.txt          # Arquivo de texto auxiliar
```

### Principais diretórios

| Diretório | Descrição |
|-----------|-----------|
| `agenda` | Funcionalidades de gerenciamento de eventos, tarefas e compromissos. |
| `notificacoes` | Gerenciamento de notificações e lembretes. |
| `setup` | Arquivos de configuração do projeto. |
| `usuarios` | Funcionalidades relacionadas aos usuários. |
| `static` | Recursos estáticos, como CSS, imagens e JavaScript. |
| `templates` | Arquivos HTML das interfaces; `base.html` é a estrutura compartilhada. |

### Arquivos principais

| Arquivo | Descrição |
|---------|-----------|
| `manage.py` | Executa comandos administrativos e inicia o servidor Django. |
| `requirements.txt` | Reúne as bibliotecas e dependências necessárias. |
| `.gitignore` | Define o que não deve ser enviado ao repositório Git. |
| `texto.txt` | Arquivo de texto presente na raiz do projeto. |

---

# 9. Equipe

| Integrante |
|------------|
| João Eduardo dos Santos Carvalho |
| Luiz Arthur Dantas Barbosa |
| Maria Letícia da Silva |
