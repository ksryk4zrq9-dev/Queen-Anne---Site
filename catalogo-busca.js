(function () {
  let ativada = false;
  let timer;

  function escapar(valor) {
    const div = document.createElement("div");
    div.textContent = String(valor || "");
    return div.innerHTML;
  }

  async function ativar() {
    if (ativada) return;
    const campo = document.getElementById("buscaProduto");
    const resultado = document.getElementById("resultadoBusca");
    const botao = document.querySelector(".btn-busca-header");
    if (!campo || !resultado || typeof window.buscarCatalogo !== "function") return;
    ativada = true;

    async function executar(navegar = false) {
      const termo = campo.value.trim();
      if (termo.length < 2) {
        resultado.style.display = "none";
        return;
      }

      try {
        const produtos = await window.buscarCatalogo(termo, 8);
        if (window.QAAnalytics) {
          window.QAAnalytics.track("pesquisa_realizada", { termo_pesquisado: termo, total_resultados: produtos.length });
        }

        if (navegar && produtos[0]) {
          location.href = `produto.html?produto=${encodeURIComponent(produtos[0].produto_chave)}`;
          return;
        }

        resultado.innerHTML = produtos.map(produto => `
          <a class="busca-item" href="produto.html?produto=${encodeURIComponent(produto.produto_chave)}">
            <img src="${escapar(produto.imagem || "img/placeholder.jpg")}" alt="${escapar(produto.nome)}" onerror="this.src='img/placeholder.jpg'">
            <span>${escapar(produto.nome)}</span>
          </a>`).join("");
        resultado.style.display = produtos.length ? "block" : "none";
      } catch (erro) {
        console.warn("Busca do catálogo indisponível.", erro);
        resultado.style.display = "none";
      }
    }

    campo.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => executar(false), 280);
    });
    botao?.addEventListener("click", () => executar(true));
    campo.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        executar(true);
      }
      if (event.key === "Escape") resultado.style.display = "none";
    });
    document.addEventListener("click", event => {
      if (!campo.contains(event.target) && !resultado.contains(event.target)) resultado.style.display = "none";
    });
  }

  function aguardarHeader() {
    if (document.getElementById("buscaProduto")) {
      ativar();
      return;
    }
    const observer = new MutationObserver(() => {
      if (document.getElementById("buscaProduto")) {
        observer.disconnect();
        ativar();
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", aguardarHeader);
  else aguardarHeader();
})();
