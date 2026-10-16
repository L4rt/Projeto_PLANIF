document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro-form");
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmar = document.getElementById("confirmar-senha");

    // Mostrar / ocultar senha (um botão por campo)
    document.querySelectorAll(".toggle-password").forEach((btn) => {
        btn.addEventListener("click", () => {
            const input = document.getElementById(btn.dataset.target);
            const visivel = input.type === "text";
            input.type = visivel ? "password" : "text";
            btn.classList.toggle("is-visible", !visivel);
            btn.setAttribute("aria-label", visivel ? "Mostrar senha" : "Ocultar senha");
        });
    });

    function setErro(input, mensagem) {
        const campo = input.closest(".field");
        campo.classList.toggle("field--invalid", Boolean(mensagem));
        campo.querySelector(".field__error").textContent = mensagem;
        return !mensagem;
    }

    const validar = {
        nome() {
            const v = nome.value.trim();
            if (!v) return setErro(nome, "Informe seu nome completo.");
            if (v.split(/\s+/).length < 2) return setErro(nome, "Digite nome e sobrenome.");
            return setErro(nome, "");
        },
        email() {
            const v = email.value.trim();
            if (!v) return setErro(email, "Informe seu e-mail.");
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return setErro(email, "Digite um e-mail válido.");
            return setErro(email, "");
        },
        senha() {
            if (!senha.value) return setErro(senha, "Crie uma senha.");
            if (senha.value.length < 8) return setErro(senha, "A senha precisa ter pelo menos 8 caracteres.");
            return setErro(senha, "");
        },
        confirmar() {
            if (!confirmar.value) return setErro(confirmar, "Confirme sua senha.");
            if (confirmar.value !== senha.value) return setErro(confirmar, "As senhas não coincidem.");
            return setErro(confirmar, "");
        },
    };

    nome.addEventListener("blur", validar.nome);
    email.addEventListener("blur", validar.email);
    senha.addEventListener("blur", () => {
        validar.senha();
        if (confirmar.value) validar.confirmar();
    });
    confirmar.addEventListener("blur", validar.confirmar);

    form.addEventListener("submit", (event) => {
        const resultados = [
            [nome, validar.nome()],
            [email, validar.email()],
            [senha, validar.senha()],
            [confirmar, validar.confirmar()],
        ];
        const primeiroErro = resultados.find(([, ok]) => !ok);
        if (primeiroErro) {
            event.preventDefault();
            primeiroErro[0].focus();
        }
    });
});