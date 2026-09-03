(function () {
  let ativada = false;
  let timer;
  let produtosAntigosPromise;

  function escapar(valor) {
    const div = document.createElement("div");
    div.textContent = String(valor || "");
    return div.innerHTML;
  }

  function normalizar(valor) {
    return String(valor || "")
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function carregarProdutosAntigos() {
    if (produtosAntigosPromise) return produtosAntigosPromise;
    produtosAntigosPromise = typeof window.getProdutos === "function"
      ? window.getProdutos().catch(() => [])
      : Promise.resolve(Array.isArray(window.produtos) ? window.produtos : []);
    return produtosAntigosPromise;
  }

  async function buscarEmTodosOsProdutos(termo, limite = 8) {
    const [novos, antigos] = await Promise.all([
      typeof window.buscarCatalogo === "function"
        ? window.buscarCatalogo(termo, limite).catch(() => [])
        : Promise.resolve([]),
      carregarProdutosAntigos()
    ]);

    const termoNormalizado = normalizar(termo);
    const antigosEncontrados = (Array.isArray(antigos) ? antigos : [])
      .filter(produto => normalizar(`${produto.nome} ${produto.descricao || produto.desc || ""} ${produto.categoria || ""}`).includes(termoNormalizado))
      .map(produto => ({ ...produto, origemBusca: "antigo" }));

    const novosEncontrados = (Array.isArray(novos) ? novos : [])
      .map(produto => ({ ...produto, origemBusca: "catalogo" }));

    const vistos = new Set();
    return [...novosEncontrados, ...antigosEncontrados]
      .filter(produto => {
        const identificador = produto.produto_chave
          ? `catalogo:${produto.produto_chave}`
          : `antigo:${produto.id}`;
        if (vistos.has(identificador)) return false;
        vistos.add(identificador);
        return true;
      })
      .slice(0, limite);
  }

  function linkProduto(produto) {
    return produto.produto_chave
      ? `produto.html?produto=${encodeURIComponent(produto.produto_chave)}`
      : `produto.html?id=${encodeURIComponent(produto.id)}`;
  }

  async function ativar() {
    if (ativada) return;
    const campo = document.getElementById("buscaProduto");
    const resultado = document.getElementById("resultadoBusca");
    const botao = document.querySelector(".btn-busca-header");
    if (!campo || !resultado) return;
    ativada = true;

    async function executar(navegar = false) {
      const termo = campo.value.trim();
      if (termo.length < 2) {
        resultado.style.display = "none";
        return;
      }

      try {
        const produtos = await buscarEmTodosOsProdutos(termo, 8);
        if (window.QAAnalytics) {
          window.QAAnalytics.track("pesquisa_realizada", { termo_pesquisado: termo, total_resultados: produtos.length });
        }

        if (navegar && produtos[0]) {
          location.href = linkProduto(produtos[0]);
          return;
        }

        resultado.innerHTML = produtos.map(produto => `
          <a class="busca-item" href="${linkProduto(produto)}">
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
