(function () {
  "use strict";

  const ENDPOINT = "/api/analytics";
  const MAX_TEXTO = 180;

  function textoSeguro(valor, limite = MAX_TEXTO) {
    const texto = String(valor || "")
      .replace(/[\u0000-\u001f\u007f]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, limite);

    // Evita gravar por acidente e-mail ou telefone digitado na pesquisa.
    if (/\S+@\S+\.\S+/.test(texto) || /\d[\d\s()+-]{7,}\d/.test(texto)) {
      return "[conteúdo omitido]";
    }

    return texto;
  }

  function nomePagina() {
    const arquivo = location.pathname.split("/").pop();
    return arquivo || "index.html";
  }

  function dadosProduto() {
    const titulo =
      document.getElementById("pdpTitle")?.textContent ||
      document.querySelector("#produtoPremium h1")?.textContent ||
      "";

    return {
      codigo_produto: new URLSearchParams(location.search).get("id") || "",
      nome_produto: textoSeguro(titulo)
    };
  }

  function enviar(evento, detalhes = {}) {
    const payload = {
      evento: textoSeguro(evento, 50),
      pagina: textoSeguro(nomePagina(), 120),
      caminho: textoSeguro(location.pathname, 240),
      ...detalhes
    };

    const corpo = JSON.stringify(payload);

    try {
      if (navigator.sendBeacon) {
        const enviado = navigator.sendBeacon(
          ENDPOINT,
          new Blob([corpo], { type: "application/json" })
        );

        if (enviado) return;
      }

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: corpo,
        keepalive: true,
        credentials: "same-origin"
      }).catch(() => {});
    } catch (_) {
      // Estatísticas nunca devem impedir o funcionamento da loja.
    }
  }

  function rastrearProdutoQuandoCarregar() {
    if (!/^(produto|produto-premium)\.html$/i.test(nomePagina())) return;

    let tentativas = 0;
    const timer = setInterval(() => {
      tentativas += 1;
      const produto = dadosProduto();
      const carregou =
        produto.nome_produto &&
        !/carregando|não foi possível/i.test(produto.nome_produto);

      if (carregou) {
        clearInterval(timer);
        enviar("produto_visualizado", produto);
      } else if (tentativas >= 30) {
        clearInterval(timer);
      }
    }, 500);
  }

  function ativarCliques() {
    document.addEventListener("click", event => {
      const elemento = event.target.closest(
        'a[href*="wa.me/"], #btnWhats, .cart-whats, #btnAddCart, [onclick*="adicionarCarrinho"]'
      );

      if (!elemento) return;

      const produto = dadosProduto();
      const href = elemento.getAttribute("href") || "";
      const texto = textoSeguro(elemento.textContent, 100);

      if (
        href.includes("wa.me/") ||
        elemento.id === "btnWhats" ||
        elemento.classList.contains("cart-whats")
      ) {
        enviar("whatsapp_clicado", {
          ...produto,
          origem_clique: texto
        });
        return;
      }

      enviar("carrinho_adicionado", produto);
    });
  }

  function ativarVercelAnalytics() {
    if (/^(localhost|127\.0\.0\.1)$/i.test(location.hostname)) return;
    if (document.querySelector('script[src="/_vercel/insights/script.js"]')) return;

    const script = document.createElement("script");
    script.defer = true;
    script.src = "/_vercel/insights/script.js";
    document.head.appendChild(script);
  }

  window.QAAnalytics = {
    track(evento, detalhes = {}) {
      const dados = {};

      Object.entries(detalhes).forEach(([chave, valor]) => {
        dados[chave] = textoSeguro(valor);
      });

      enviar(evento, dados);
    }
  };

  function iniciar() {
    ativarVercelAnalytics();
    ativarCliques();
    enviar("pagina_visualizada");
    rastrearProdutoQuandoCarregar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  } else {
    iniciar();
  }
})();
