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

  function pontuarNome(nome, termo) {
    const nomeNormalizado = normalizar(nome).trim();
    const termoNormalizado = normalizar(termo).trim();

    if (!termoNormalizado) return 0;
    if (nomeNormalizado.startsWith(termoNormalizado)) return 300;
    if (nomeNormalizado.split(/\s+/).some(palavra => palavra.startsWith(termoNormalizado))) return 200;
    if (nomeNormalizado.includes(termoNormalizado)) return 150;

    function distancia(a, b) {
      const anterior = Array.from({ length: b.length + 1 }, (_, indice) => indice);
      for (let i = 1; i <= a.length; i += 1) {
        const atual = [i];
        for (let j = 1; j <= b.length; j += 1) {
          atual[j] = Math.min(
            atual[j - 1] + 1,
            anterior[j] + 1,
            anterior[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
          );
        }
        for (let j = 0; j < atual.length; j += 1) anterior[j] = atual[j];
      }
      return anterior[b.length];
    }

    const tolerancia = termoNormalizado.length <= 4 ? 1 : termoNormalizado.length <= 8 ? 2 : 3;
    const palavras = nomeNormalizado.split(/\s+/).filter(Boolean);
    const melhorDistancia = Math.min(
      distancia(nomeNormalizado, termoNormalizado),
      ...palavras.map(palavra => distancia(palavra, termoNormalizado))
    );
    return melhorDistancia <= tolerancia ? 100 - melhorDistancia : 0;
  }

  async function buscarEmTodosOsProdutos(termo, limite = 8) {
    const termoNormalizado = normalizar(termo).trim();
    const prefixo = termoNormalizado.length >= 4 ? termoNormalizado.slice(0, 3) : termoNormalizado.slice(0, 2);
    const [novos, antigos] = await Promise.all([
      typeof window.buscarCatalogo === "function"
        ? Promise.all([
            window.buscarCatalogo(termo, Math.min(48, Math.max(limite, 24))).catch(() => []),
            prefixo && prefixo !== termoNormalizado
              ? window.buscarCatalogo(prefixo, 48).catch(() => [])
              : Promise.resolve([])
          ]).then(listas => listas.flat())
        : Promise.resolve([]),
      carregarProdutosAntigos()
    ]);

    const antigosEncontrados = (Array.isArray(antigos) ? antigos : [])
      .map(produto => ({ ...produto, origemBusca: "antigo", relevanciaBusca: pontuarNome(produto.nome, termo) }))
      .filter(produto => produto.relevanciaBusca > 0);

    const novosEncontrados = (Array.isArray(novos) ? novos : [])
      .map(produto => ({ ...produto, origemBusca: "catalogo", relevanciaBusca: pontuarNome(produto.nome, termo) }))
      .filter(produto => produto.relevanciaBusca > 0);

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
      .sort((a, b) => b.relevanciaBusca - a.relevanciaBusca || String(a.nome).localeCompare(String(b.nome), "pt-BR"))
      .slice(0, limite);
  }

  window.QABusca = { buscar: buscarEmTodosOsProdutos, linkProduto, normalizar, pontuarNome };

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

        if (navegar) {
          location.href = `pesquisa.html?q=${encodeURIComponent(termo)}`;
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
