/* =========================================================
   PLANIF - main.js (calendário)
   Local sugerido no Django: static/js/main.js

   Os eventos ficam salvos no localStorage do navegador.
   Para ligar ao Django, troque apenas as funções
   carregarEventos() e salvarEventos() (veja os comentários).
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Configurações ---------- */
  var CARREGAR_EXEMPLO = true; // coloque false para começar sem o evento de exemplo
  var CHAVE_STORAGE = "planif:eventos";

  var HORARIOS = [
    "7:00 - 8:30",
    "8:50 - 10:20",
    "10:30 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:30",
    "14:50 - 16:20",
    "16:30 - 18:00"
  ];
  var INICIOS = ["7:00", "8:50", "10:30", "12:00", "13:00", "14:50", "16:30"];

  var MESES = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ];
  var DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  var DIAS_CURTOS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  var DIAS_LONGOS = [
    "domingo", "segunda-feira", "terça-feira", "quarta-feira",
    "quinta-feira", "sexta-feira", "sábado"
  ];

  /* ---------- Elementos ---------- */
  var elTitulo = document.getElementById("calTitulo");
  var elSubtitulo = document.getElementById("calSubtitulo");
  var elGrade = document.getElementById("calGrade");
  var btnAnterior = document.getElementById("btnAnterior");
  var btnProximo = document.getElementById("btnProximo");
  var btnHoje = document.getElementById("btnHoje");
  var btnNovo = document.getElementById("btnNovo");
  var botoesVisao = document.querySelectorAll(".seg__btn");

  var modal = document.getElementById("modalEvento");
  var form = document.getElementById("formEvento");
  var modalTitulo = document.getElementById("modalTitulo");
  var campoTitulo = document.getElementById("evTitulo");
  var campoData = document.getElementById("evData");
  var campoSlot = document.getElementById("evSlot");
  var btnExcluir = document.getElementById("btnExcluir");
  var btnCancelar = document.getElementById("btnCancelar");

  if (!elGrade || !modal) {
    return;
  }

  /* ---------- Datas ---------- */
  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function paraChave(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function deChave(texto) {
    var p = texto.split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function semHora(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function somarDias(d, n) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  }

  function inicioSemana(d) {
    var dow = (d.getDay() + 6) % 7; // segunda = 0
    return somarDias(semHora(d), -dow);
  }

  function ehFimDeSemana(d) {
    return d.getDay() === 0 || d.getDay() === 6;
  }

  function mesmoDia(a, b) {
    return paraChave(a) === paraChave(b);
  }

  function nomeDia(d) {
    return DIAS_SEMANA[(d.getDay() + 6) % 7];
  }

  function nomeDiaCurto(d) {
    return DIAS_CURTOS[(d.getDay() + 6) % 7];
  }

  /* ---------- Armazenamento ----------
     >>> Para usar o banco de dados do Django, substitua estas duas
     funções por chamadas fetch() às suas views (GET para listar,
     POST/PUT/DELETE para salvar). O resto do código não muda. */
  function criarExemplo() {
    var terca = somarDias(inicioSemana(new Date()), 1);
    return [{
      id: "exemplo1",
      titulo: "Reunião Projeto",
      tipo: "evento",
      data: paraChave(terca),
      slot: 4
    }];
  }

  function carregarEventos() {
    try {
      var bruto = window.localStorage.getItem(CHAVE_STORAGE);
      if (bruto === null) {
        var inicial = CARREGAR_EXEMPLO ? criarExemplo() : [];
        window.localStorage.setItem(CHAVE_STORAGE, JSON.stringify(inicial));
        return inicial;
      }
      var lista = JSON.parse(bruto);
      return Array.isArray(lista) ? lista : [];
    } catch (erro) {
      return CARREGAR_EXEMPLO ? criarExemplo() : [];
    }
  }

  function salvarEventos() {
    try {
      window.localStorage.setItem(CHAVE_STORAGE, JSON.stringify(eventos));
    } catch (erro) {
      /* sem armazenamento disponível: os dados valem só até recarregar a página */
    }
  }

  /* ---------- Estado ---------- */
  var eventos = carregarEventos();
  var estado = {
    visao: window.innerWidth <= 700 ? "dia" : "semana",
    ref: semHora(new Date())
  };
  var editandoId = null;

  function eventosDoDia(d) {
    var chave = paraChave(d);
    return eventos
      .filter(function (ev) { return ev.data === chave; })
      .sort(function (a, b) { return a.slot - b.slot; });
  }

  /* ---------- Utilitário de DOM ---------- */
  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) { e.className = classe; }
    if (texto !== undefined) { e.textContent = texto; }
    return e;
  }

  /* ---------- Cabeçalho ---------- */
  function textoIntervaloSemana(seg, sex) {
    if (seg.getMonth() === sex.getMonth()) {
      return seg.getDate() + " a " + sex.getDate() + " de " + MESES[sex.getMonth()];
    }
    return seg.getDate() + " de " + MESES[seg.getMonth()] +
      " a " + sex.getDate() + " de " + MESES[sex.getMonth()];
  }

  function atualizarCabecalho() {
    var ref = estado.ref;
    var base = estado.visao === "semana" ? somarDias(inicioSemana(ref), 2) : ref;

    elTitulo.textContent = (MESES[base.getMonth()] + " " + base.getFullYear()).toUpperCase();

    if (estado.visao === "semana") {
      var seg = inicioSemana(ref);
      elSubtitulo.textContent = textoIntervaloSemana(seg, somarDias(seg, 4));
      btnAnterior.setAttribute("aria-label", "Semana anterior");
      btnProximo.setAttribute("aria-label", "Próxima semana");
    } else if (estado.visao === "dia") {
      elSubtitulo.textContent = DIAS_LONGOS[ref.getDay()] + ", " + ref.getDate() +
        " de " + MESES[ref.getMonth()] + " de " + ref.getFullYear();
      btnAnterior.setAttribute("aria-label", "Dia anterior");
      btnProximo.setAttribute("aria-label", "Próximo dia");
    } else {
      elSubtitulo.textContent = "";
      btnAnterior.setAttribute("aria-label", "Mês anterior");
      btnProximo.setAttribute("aria-label", "Próximo mês");
    }

    botoesVisao.forEach(function (b) {
      var ativo = b.getAttribute("data-visao") === estado.visao;
      b.classList.toggle("is-ativo", ativo);
      b.setAttribute("aria-pressed", ativo ? "true" : "false");
    });
  }

  /* ---------- Eventos (chips) ---------- */
  function criarChip(ev, compacto) {
    var b = el("button", "evento evento--" + ev.tipo);
    b.type = "button";
    b.textContent = compacto ? INICIOS[ev.slot] + " " + ev.titulo : ev.titulo;
    b.title = ev.titulo + " (" + HORARIOS[ev.slot] + ")";
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      abrirModal(ev);
    });
    return b;
  }

  function irParaDia(d) {
    estado.ref = semHora(d);
    estado.visao = "dia";
    render();
  }

  /* ---------- Grade: semana e dia ---------- */
  function montarSemanaOuDia() {
    var hoje = new Date();
    var dias = [];
    var i;

    if (estado.visao === "dia") {
      dias = [estado.ref];
    } else {
      var seg = inicioSemana(estado.ref);
      for (i = 0; i < 5; i++) { dias.push(somarDias(seg, i)); }
    }

    elGrade.style.setProperty("--colunas", dias.length);
    elGrade.appendChild(el("div", "cel cel--canto"));

    dias.forEach(function (d) {
      var cab = el("div", "cel cel--cab" + (mesmoDia(d, hoje) ? " cel--hoje" : ""));
      cab.appendChild(el("span", "", nomeDia(d)));
      cab.appendChild(el("small", "", pad(d.getDate()) + "/" + pad(d.getMonth() + 1)));
      elGrade.appendChild(cab);
    });

    HORARIOS.forEach(function (horario, slot) {
      elGrade.appendChild(el("div", "cel cel--hora", horario));

      dias.forEach(function (d) {
        var celula = el("div", "cel cel--slot");
        celula.title = "Adicionar em " + nomeDia(d) + ", " + horario;

        eventosDoDia(d).forEach(function (ev) {
          if (ev.slot === slot) { celula.appendChild(criarChip(ev, false)); }
        });

        celula.addEventListener("click", function () {
          abrirModal(null, { data: paraChave(d), slot: slot });
        });
        elGrade.appendChild(celula);
      });
    });
  }

  /* ---------- Grade: mês ---------- */
  function montarMes() {
    var hoje = new Date();
    var ref = estado.ref;
    var primeiro = new Date(ref.getFullYear(), ref.getMonth(), 1);
    var ultimo = new Date(ref.getFullYear(), ref.getMonth() + 1, 0);
    var inicio = inicioSemana(primeiro);
    var fim = somarDias(inicioSemana(ultimo), 6);
    var total = Math.round((fim - inicio) / 86400000) + 1;
    var i;

    elGrade.style.setProperty("--linhas", total / 7);

    for (i = 0; i < 7; i++) {
      var cab = el("div", "cel cel--cab");
      cab.appendChild(el("span", "longo", DIAS_SEMANA[i]));
      cab.appendChild(el("span", "curto", DIAS_CURTOS[i]));
      elGrade.appendChild(cab);
    }

    for (i = 0; i < total; i++) {
      (function (d) {
        var classes = "cel cel--mes";
        if (d.getMonth() !== ref.getMonth()) { classes += " cel--fora"; }
        if (mesmoDia(d, hoje)) { classes += " cel--hoje-mes"; }
        var celula = el("div", classes);

        var num = el("button", "dia-num", String(d.getDate()));
        num.type = "button";
        num.setAttribute("aria-label", "Abrir " + nomeDia(d) + ", " + d.getDate() + " de " + MESES[d.getMonth()]);
        celula.appendChild(num);

        var lista = eventosDoDia(d);
        lista.slice(0, 3).forEach(function (ev) {
          celula.appendChild(criarChip(ev, true));
        });
        if (lista.length > 3) {
          var mais = el("button", "mais", "+" + (lista.length - 3) + " mais");
          mais.type = "button";
          celula.appendChild(mais);
        }

        celula.addEventListener("click", function () { irParaDia(d); });
        elGrade.appendChild(celula);
      })(somarDias(inicio, i));
    }
  }

  /* ---------- Render ---------- */
  function render() {
    atualizarCabecalho();
    elGrade.textContent = "";
    elGrade.className = "grade grade--" + estado.visao;

    if (estado.visao === "mes") {
      montarMes();
    } else {
      montarSemanaOuDia();
    }
  }

  /* ---------- Navegação ---------- */
  function mover(direcao) {
    var r = estado.ref;

    if (estado.visao === "mes") {
      var alvoMes = r.getMonth() + direcao;
      var diasNoMes = new Date(r.getFullYear(), alvoMes + 1, 0).getDate();
      estado.ref = new Date(r.getFullYear(), alvoMes, Math.min(r.getDate(), diasNoMes));
    } else if (estado.visao === "semana") {
      estado.ref = somarDias(r, 7 * direcao);
    } else {
      var d = somarDias(r, direcao);
      while (ehFimDeSemana(d)) { d = somarDias(d, direcao); }
      estado.ref = d;
    }
    render();
  }

  btnAnterior.addEventListener("click", function () { mover(-1); });
  btnProximo.addEventListener("click", function () { mover(1); });
  btnHoje.addEventListener("click", function () {
    estado.ref = semHora(new Date());
    render();
  });

  botoesVisao.forEach(function (b) {
    b.addEventListener("click", function () {
      estado.visao = b.getAttribute("data-visao");
      render();
    });
  });

  /* ---------- Modal ---------- */
  HORARIOS.forEach(function (horario, i) {
    var op = document.createElement("option");
    op.value = String(i);
    op.textContent = horario;
    campoSlot.appendChild(op);
  });

  function abrirDialogo() {
    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }
  }

  function fecharDialogo() {
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
  }

  function abrirModal(ev, padrao) {
    var novo = !ev;
    var dataPadrao = estado.visao === "mes" ? new Date() : estado.ref;

    editandoId = novo ? null : ev.id;
    modalTitulo.textContent = novo ? "Novo evento ou tarefa" : "Editar evento ou tarefa";
    btnExcluir.hidden = novo;

    campoTitulo.value = novo ? "" : ev.titulo;
    campoData.value = novo ? ((padrao && padrao.data) || paraChave(dataPadrao)) : ev.data;
    campoSlot.value = String(novo ? (padrao && padrao.slot !== undefined ? padrao.slot : 0) : ev.slot);

    var tipo = novo ? "evento" : ev.tipo;
    form.querySelectorAll('input[name="tipo"]').forEach(function (r) {
      r.checked = r.value === tipo;
    });

    abrirDialogo();
    campoTitulo.focus();
  }

  btnNovo.addEventListener("click", function () { abrirModal(null); });
  btnCancelar.addEventListener("click", fecharDialogo);

  // clicar no fundo escuro fecha a janela
  modal.addEventListener("click", function (e) {
    if (e.target === modal) { fecharDialogo(); }
  });

  btnExcluir.addEventListener("click", function () {
    if (!editandoId) { return; }
    if (window.confirm("Excluir este item?")) {
      eventos = eventos.filter(function (ev) { return ev.id !== editandoId; });
      salvarEventos();
      fecharDialogo();
      render();
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var titulo = campoTitulo.value.trim();
    if (!titulo) {
      campoTitulo.value = "";
      campoTitulo.reportValidity();
      return;
    }

    var tipoMarcado = form.querySelector('input[name="tipo"]:checked');
    var dados = {
      titulo: titulo,
      tipo: tipoMarcado ? tipoMarcado.value : "evento",
      data: campoData.value,
      slot: Number(campoSlot.value)
    };

    if (editandoId) {
      eventos = eventos.map(function (ev) {
        return ev.id === editandoId
          ? { id: ev.id, titulo: dados.titulo, tipo: dados.tipo, data: dados.data, slot: dados.slot }
          : ev;
      });
    } else {
      dados.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      eventos.push(dados);
    }

    salvarEventos();
    estado.ref = deChave(dados.data); // leva a tela até o item salvo
    fecharDialogo();
    render();
  });

  /* ---------- Início ---------- */
  render();
})();