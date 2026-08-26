/**
 * LiveSurf Geek Mode — news.livesurf.app
 *
 * ⚠️ DESTINO: wp-content/mu-plugins/livesurf-geek.js (mesma pasta do .php).
 * Fonte versionada: livesurf-site/assets/news/ — ver o README de la.
 *
 * Tres coisas:
 *   1. o botao que liga/desliga a skin de terminal;
 *   2. o cursor piscando no `>News_` — vale nos DOIS modos, e a marca do site;
 *   3. a datilografia da materia, so no modo geek.
 *
 * Sem dependencia. O estado vive em `data-geek` no <html> (escrito antes da
 * primeira pintura pelo .php) e num cookie no dominio-pai.
 */
(function () {
  "use strict";

  var RAIZ = document.documentElement;
  var COOKIE = "ls_geek";

  /**
   * Cookie no dominio-PAI (`.livesurf.app`) para a escolha atravessar entre
   * news.livesurf.app e observatorio.livesurf.app — que sao origens distintas
   * e, portanto, nao compartilham localStorage.
   *
   * ⚠️ Em localhost o `domain` nao casa e o navegador DESCARTA o cookie em
   * silencio: o toggle "nao funciona" em desenvolvimento sem nenhum erro. Por
   * isso o dominio so entra quando o host termina em livesurf.app.
   */
  function gravarCookie(ligado) {
    var base = COOKIE + "=" + (ligado ? "1" : "0") + ";path=/;max-age=31536000;samesite=lax";
    if (/\.?livesurf\.app$/.test(location.hostname)) base += ";domain=.livesurf.app";
    if (location.protocol === "https:") base += ";secure";
    document.cookie = base;
  }

  function estaLigado() {
    return RAIZ.getAttribute("data-geek") === "1";
  }

  function alternar() {
    var novo = !estaLigado();
    if (novo) RAIZ.setAttribute("data-geek", "1");
    else RAIZ.removeAttribute("data-geek");
    gravarCookie(novo);
    atualizarBotao();
    // Ligar no meio da leitura nao redatilografa a materia: seria puxar o texto
    // debaixo de quem ja esta lendo. Vale a partir da proxima pagina.
  }

  var botao;

  function atualizarBotao() {
    if (!botao) return;
    var ligado = estaLigado();
    botao.textContent = ligado ? "> GEEK ON" : "> GEEK";
    botao.setAttribute("aria-pressed", ligado ? "true" : "false");
  }

  function montarBotao() {
    botao = document.createElement("button");
    botao.type = "button";
    botao.className = "ls-geek-toggle";
    botao.setAttribute("aria-pressed", "false");
    botao.addEventListener("click", alternar);
    atualizarBotao();

    // Dentro do menu, para parecer parte do site. O tema ja mudou de markup
    // antes (o logo sumiu numa troca), entao ha reserva: um botao fixo no
    // canto e feio, mas um toggle que SOME e pior.
    var menu = document.querySelector(".main-navigation .menu, .main-navigation ul");
    if (menu) {
      var item = document.createElement("li");
      item.className = "menu-item ls-geek-item";
      item.appendChild(botao);
      menu.appendChild(item);
    } else {
      botao.classList.add("ls-geek-flutuante");
      document.body.appendChild(botao);
    }
  }

  /**
   * O titulo do site e `>News_`. Nao da para animar so o `_` por CSS — nao
   * existe seletor de caractere —, entao o ultimo caractere e envolvido num
   * span e o CSS pisca esse span.
   *
   * Vale nos dois modos: e a marca, nao um enfeite do geek.
   */
  function cursorNoTitulo() {
    var alvo = document.querySelector(".site-title a");
    if (!alvo || alvo.querySelector(".ls-cursor")) return;
    var texto = alvo.textContent || "";
    if (texto.slice(-1) !== "_") return;
    alvo.textContent = texto.slice(0, -1);
    var cursor = document.createElement("span");
    cursor.className = "ls-cursor";
    cursor.textContent = "_";
    // O cursor e decoracao: leitor de tela nao deve anunciar "underline".
    cursor.setAttribute("aria-hidden", "true");
    alvo.appendChild(cursor);
  }

  /** Duração total da datilografia. Ver a nota em `datilografar`. */
  var DURACAO_MS = 4000;
  var QUADROS_POR_SEGUNDO = 60;

  /**
   * Datilografa o corpo da materia.
   *
   * ⚠️ Mexe SO EM NOS DE TEXTO. Um typewriter que escreve em `textContent`
   * apagaria os links, o negrito e o rodape "Fonte: <a>" de toda materia — a
   * estrutura HTML tem que sobreviver, so o texto e reposto.
   *
   * ⚠️ A velocidade sai do TAMANHO, nao e fixa por caractere. A 8ms/caractere
   * uma materia de 5.000 caracteres levaria 40 segundos; aqui o total e
   * limitado a DURACAO_MS e curta e longa terminam junto.
   */
  function datilografar(container) {
    var nos = [];
    var total = 0;
    var caminhante = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
    var no;
    while ((no = caminhante.nextNode())) {
      var conteudo = no.nodeValue;
      if (!conteudo || !conteudo.trim()) continue;
      nos.push({ no: no, texto: conteudo });
      total += conteudo.length;
    }
    if (!total) return;

    for (var i = 0; i < nos.length; i++) nos[i].no.nodeValue = "";
    container.setAttribute("aria-busy", "true");

    var porQuadro = Math.max(1, Math.ceil(total / (DURACAO_MS / (1000 / QUADROS_POR_SEGUNDO))));
    var indiceNo = 0;
    var escritos = 0;
    var encerrado = false;

    function revelarTudo() {
      if (encerrado) return;
      encerrado = true;
      for (var j = 0; j < nos.length; j++) nos[j].no.nodeValue = nos[j].texto;
      container.removeAttribute("aria-busy");
      document.removeEventListener("click", revelarTudo);
      document.removeEventListener("keydown", revelarTudo);
    }

    // Quem nao quer esperar clica (ou aperta qualquer tecla) e ve tudo.
    document.addEventListener("click", revelarTudo);
    document.addEventListener("keydown", revelarTudo);

    function passo() {
      if (encerrado) return;
      var restante = porQuadro;
      while (restante > 0 && indiceNo < nos.length) {
        var atual = nos[indiceNo];
        var falta = atual.texto.length - escritos;
        var leva = Math.min(falta, restante);
        escritos += leva;
        restante -= leva;
        atual.no.nodeValue = atual.texto.slice(0, escritos);
        if (escritos >= atual.texto.length) {
          indiceNo++;
          escritos = 0;
        }
      }
      if (indiceNo >= nos.length) return revelarTudo();
      requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  function iniciar() {
    cursorNoTitulo();
    montarBotao();

    // Datilografia so na materia (single) e so no geek. Na home seriam dezenas
    // de cartoes datilografando ao mesmo tempo — ruido, nao clima.
    if (!estaLigado()) return;
    if (!document.body.classList.contains("single")) return;
    // Pisca-pisca e texto em movimento sao gatilho de enjoo para quem tem
    // sensibilidade a movimento. Aqui o texto simplesmente ja aparece pronto.
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var corpo = document.querySelector(".entry-content");
    if (corpo) datilografar(corpo);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
