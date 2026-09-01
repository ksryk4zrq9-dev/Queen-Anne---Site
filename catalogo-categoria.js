(function () {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("cat") || "Todos";
  let paginaAtual = Math.max(1, Number(params.get("pagina")) || 1);

  function escapar(valor) {
    const div = document.createElement("div");
    div.textContent = String(valor || "");
    return div.innerHTML;
  }

  function preco(produto) {
    const minimo = Number(produto.preco_min || 0);
    const maximo = Number(produto.preco_max || minimo);
    return maximo > minimo
      ? `A partir de U$ ${minimo.toFixed(2)}`
      : `U$ ${minimo.toFixed(2)}`;
  }

  function normalizar(valor) {
    return String(valor || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();
  }

  function aguardarProdutosAntigos() {
    if (Array.isArray(window.produtos) && window.produtos.length) {
      return Promise.resolve(window.produtos);
    }

    return new Promise(resolve => {
      let finalizado = false;
      const concluir = () => {
        if (finalizado) return;
        finalizado = true;
        window.removeEventListener("qa:produtos-carregados", concluir);
        resolve(Array.isArray(window.produtos) ? window.produtos : []);
      };

      window.addEventListener("qa:produtos-carregados", concluir, { once: true });
      setTimeout(concluir, 5000);
    });
  }

  async function carregarCatalogoNovo() {
    const primeira = await window.getCatalogoPagina({
      categoria,
      pagina: 1,
      limite: 48,
      ordem: "nome"
    });
    const produtos = [...primeira.produtos];

    for (let pagina = 2; pagina <= primeira.totalPaginas; pagina += 1) {
      const resultado = await window.getCatalogoPagina({
        categoria,
        pagina,
        limite: 48,
        ordem: "nome"
      });
      produtos.push(...resultado.produtos);
    }

    return produtos.map(produto => ({ ...produto, origem: "catalogo" }));
  }

  function prepararProdutosAntigos(produtos) {
    return produtos
      .filter(produto => categoria === "Todos" || normalizar(produto.categoria) === normalizar(categoria))
      .map(produto => ({
        origem: "antigo",
        id: produto.id,
        nome: produto.nome,
        imagem: produto.images?.[0] || produto.imagem || "img/placeholder.jpg",
        preco_min: Number(produto.preco || 0),
        preco_max: Number(produto.preco || 0),
        quantidade_variacoes: 1
      }));
  }

  function ordenarProdutos(produtos, ordem) {
    const lista = [...produtos];
    if (ordem === "menor-preco") return lista.sort((a, b) => Number(a.preco_min) - Number(b.preco_min));
    if (ordem === "maior-preco") return lista.sort((a, b) => Number(b.preco_min) - Number(a.preco_min));
    return lista.sort((a, b) => String(a.nome).localeCompare(String(b.nome), "pt-BR"));
  }

  function atualizarUrl() {
    const url = new URL(window.location.href);
    if (paginaAtual > 1) url.searchParams.set("pagina", paginaAtual);
    else url.searchParams.delete("pagina");
    history.replaceState(null, "", url);
  }

  function renderizarPaginacao(totalPaginas) {
    let paginacao = document.getElementById("catalogoPaginacao");
    if (!paginacao) {
      paginacao = document.createElement("nav");
      paginacao.id = "catalogoPaginacao";
      paginacao.className = "catalogo-paginacao";
      paginacao.setAttribute("aria-label", "Paginação de produtos");
      document.getElementById("listaProdutos")?.insertAdjacentElement("afterend", paginacao);
    }

    if (totalPaginas <= 1) {
      paginacao.innerHTML = "";
      return;
    }

    paginacao.innerHTML = `
      <button type="button" data-pagina="${paginaAtual - 1}" ${paginaAtual === 1 ? "disabled" : ""}>Anterior</button>
      <span>Página <strong>${paginaAtual}</strong> de ${totalPaginas}</span>
      <button type="button" data-pagina="${paginaAtual + 1}" ${paginaAtual === totalPaginas ? "disabled" : ""}>Próxima</button>
    `;

    paginacao.querySelectorAll("button:not([disabled])").forEach(botao => {
      botao.addEventListener("click", () => {
        paginaAtual = Number(botao.dataset.pagina);
        atualizarUrl();
        carregar();
        document.querySelector(".categoria-page")?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  async function carregar() {
    const container = document.getElementById("listaProdutos");
    const contador = document.getElementById("quantidadeProdutos");
    const ordenar = document.getElementById("ordenarProdutos");
    if (!container) return;

    container.innerHTML = '<p class="categoria-carregando">Carregando produtos...</p>';

    try {
      const [novos, antigosOriginais] = await Promise.all([
        carregarCatalogoNovo(),
        aguardarProdutosAntigos()
      ]);

      const antigos = prepararProdutosAntigos(antigosOriginais);
      const nomesNovos = new Set(novos.map(produto => normalizar(produto.nome)));
      const combinados = ordenarProdutos(
        [...novos, ...antigos.filter(produto => !nomesNovos.has(normalizar(produto.nome)))],
        ordenar?.value || "relevancia"
      );
      const limite = 24;
      const totalPaginas = Math.max(1, Math.ceil(combinados.length / limite));
      if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
      const inicio = (paginaAtual - 1) * limite;
      const produtosPagina = combinados.slice(inicio, inicio + limite);

      if (contador) contador.textContent = String(combinados.length);

      if (!produtosPagina.length) {
        container.innerHTML = '<div class="nenhum-produto"><h3>Nenhum produto encontrado</h3><p>Ainda não há produtos cadastrados nesta categoria.</p></div>';
        renderizarPaginacao(1);
        return;
      }

      container.innerHTML = produtosPagina.map(produto => {
        const link = produto.origem === "antigo"
          ? `produto.html?id=${encodeURIComponent(produto.id)}`
          : `produto.html?produto=${encodeURIComponent(produto.produto_chave)}`;
        return `
          <div class="produto-card">
            <a href="${link}"><img src="${escapar(produto.imagem || "img/placeholder.jpg")}" alt="${escapar(produto.nome)}" onerror="this.src='img/placeholder.jpg'"></a>
            <h3>${escapar(produto.nome || "Produto")}</h3>
            <p class="preco">${preco(produto)}</p>
            <a href="${link}" class="btn-ver">Ver produto</a>
          </div>`;
      }).join("");

      renderizarPaginacao(totalPaginas);
    } catch (erro) {
      console.error("Erro ao carregar o novo catálogo:", erro);
      container.innerHTML = '<div class="nenhum-produto"><h3>Catálogo em preparação</h3><p>Conclua a importação no Supabase e atualize esta página.</p></div>';
      if (contador) contador.textContent = "0";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("tituloCategoria").textContent = categoria === "Todos" ? "Todos os produtos" : categoria;
    document.getElementById("breadcrumbCategoria").textContent = categoria === "Todos" ? "Todos os produtos" : categoria;
    document.getElementById("ordenarProdutos")?.addEventListener("change", () => {
      paginaAtual = 1;
      atualizarUrl();
      carregar();
    });
    carregar();
  });
})();
