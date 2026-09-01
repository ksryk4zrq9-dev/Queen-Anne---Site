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
      const resultado = await window.getCatalogoPagina({
        categoria,
        pagina: paginaAtual,
        limite: 24,
        ordem: ordenar?.value || "relevancia"
      });

      if (contador) contador.textContent = String(resultado.total);

      if (!resultado.produtos.length) {
        container.innerHTML = '<div class="nenhum-produto"><h3>Nenhum produto encontrado</h3><p>Ainda não há produtos cadastrados nesta categoria.</p></div>';
        renderizarPaginacao(1);
        return;
      }

      container.innerHTML = resultado.produtos.map(produto => {
        const link = `produto.html?produto=${encodeURIComponent(produto.produto_chave)}`;
        const variacoes = Number(produto.quantidade_variacoes) > 1
          ? `<span class="produto-variacoes">${produto.quantidade_variacoes} opções</span>`
          : "";

        return `
          <div class="produto-card">
            <a href="${link}"><img src="${escapar(produto.imagem || "img/placeholder.jpg")}" alt="${escapar(produto.nome)}" onerror="this.src='img/placeholder.jpg'"></a>
            ${variacoes}
            <h3>${escapar(produto.nome || "Produto")}</h3>
            <p class="preco">${preco(produto)}</p>
            <a href="${link}" class="btn-ver">Ver produto</a>
          </div>`;
      }).join("");

      renderizarPaginacao(resultado.totalPaginas);
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
