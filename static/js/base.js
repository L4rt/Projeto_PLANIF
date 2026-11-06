/* =========================================================
   PLANIF - base.js
   Local sugerido no Django: static/js/base.js
   ========================================================= */

(function () {
  "use strict";

  var botaoMenu = document.getElementById("menuToggle");
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  var larguraMobile = window.matchMedia("(max-width: 800px)");

  if (!botaoMenu || !sidebar || !overlay) {
    return;
  }

  function abrirMenu() {
    sidebar.classList.add("is-open");
    overlay.hidden = false;
    document.body.classList.add("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "true");
    botaoMenu.setAttribute("aria-label", "Fechar menu lateral");
  }

  function fecharMenu() {
    sidebar.classList.remove("is-open");
    overlay.hidden = true;
    document.body.classList.remove("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu lateral");
  }

  function alternarMenu() {
    if (sidebar.classList.contains("is-open")) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  }

  // Botão hambúrguer
  botaoMenu.addEventListener("click", alternarMenu);

  // Clique no fundo escuro fecha o menu
  overlay.addEventListener("click", fecharMenu);

  // Tecla Esc fecha o menu
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && sidebar.classList.contains("is-open")) {
      fecharMenu();
      botaoMenu.focus();
    }
  });

  // Ao voltar para a tela grande, garante que o menu volte ao normal
  function aoMudarTamanho(evento) {
    if (!evento.matches) {
      fecharMenu();
    }
  }

  if (larguraMobile.addEventListener) {
    larguraMobile.addEventListener("change", aoMudarTamanho);
  } else {
    // Navegadores mais antigos
    larguraMobile.addListener(aoMudarTamanho);
  }
})();