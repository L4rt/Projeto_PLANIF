document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const toggleBtn = document.getElementById("toggle-password");

    // Mostrar / ocultar senha
    toggleBtn.addEventListener("click", () => {
        const visivel = senhaInput.type === "text";
        senhaInput.type = visivel ? "password" : "text";
        toggleBtn.classList.toggle("is-visible", !visivel);
        toggleBtn.setAttribute("aria-label", visivel ? "Mostrar senha" : "Ocultar senha");
    });

    // Validação
    function setErro(input, mensagem) {
        const campo = input.closest(".field");
        campo.classList.toggle("field--invalid", Boolean(mensagem));
        campo.querySelector(".field__error").textContent = mensagem;
    }

    function validarEmail() {
        const valor = emailInput.value.trim();
        if (!valor) return setErro(emailInput, "Informe seu e-mail."), false;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            return setErro(emailInput, "Digite um e-mail válido."), false;
        }
        return setErro(emailInput, ""), true;
    }

    function validarSenha() {
        if (!senhaInput.value) return setErro(senhaInput, "Informe sua senha."), false;
        return setErro(senhaInput, ""), true;
    }

    emailInput.addEventListener("blur", validarEmail);
    senhaInput.addEventListener("blur", validarSenha);

    form.addEventListener("submit", (event) => {
        const emailOk = validarEmail();
        const senhaOk = validarSenha();
        if (!emailOk || !senhaOk) {
            event.preventDefault();
            (emailOk ? senhaInput : emailInput).focus();
        }
    });
});