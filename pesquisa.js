(function () {
  const params = new URLSearchParams(location.search);
  const termo = String(params.get("q") || "").trim();
  let produtosEncontrados = [];
  let paginaAtual = 1;
  const limitePagina = 24;

  function escapar(valor) {
    const div = document.createElement("div");
    div.textContent = String(valor || "");
    return div.innerHTML;
  }

  function preco(produto) {
    const minimo = Number(produto.preco_min ?? produto.preco ?? 0);
    const maximo = Number(produto.preco_max ?? minimo);
    return maximo > minimo ? `A partir de U$ ${minimo.toFixed(2)}` : `U$ ${minimo.toFixed(2)}`;
  }

  function ordenar(lista, ordem) {
    const copia = [...lista];
    if (ordem === "menor-preco") return copia.sort((a, b) => Number(a.preco_min ?? a.preco) - Number(b.preco_min ?? b.preco));
    if (ordem === "maior-preco") return copia.sort((a, b) => Number(b.preco_min ?? b.preco) - Number(a.preco_min ?? a.preco));
    if (ordem === "nome") return copia.sort((a, b) => String(a.nome).localeCompare(String(b.nome), "pt-BR"));
    return copia.sort((a, b) => b.relevanciaBusca - a.relevanciaBusca || String(a.nome).localeCompare(String(b.nome), "pt-BR"));
  }

  function renderizarPaginacao(totalPaginas) {
    const paginacao = document.getElementById("catalogoPaginacao");
    if (!paginacao) return;
    if (totalPaginas <= 1) {
      paginacao.innerHTML = "";
      return;
    }
    paginacao.innerHTML = `
      <button type="button" data-pagina="${paginaAtual - 1}" ${paginaAtual === 1 ? "disabled" : ""}>Anterior</button>
      <span>Página <strong>${paginaAtual}</strong> de ${totalPaginas}</span>
      <button type="button" data-pagina="${paginaAtual + 1}" ${paginaAtual === totalPaginas ? "disabled" : ""}>Próxima</button>`;
    paginacao.querySelectorAll("button:not([disabled])").forEach(botao => {
      botao.addEventListener("click", () => {
        paginaAtual = Number(botao.dataset.pagina);
        renderizar();
        document.querySelector(".categoria-page")?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function renderizar() {
    const container = document.getElementById("listaProdutos");
    const ordem = document.getElementById("ordenarProdutos")?.value || "relevancia";
    const lista = ordenar(produtosEncontrados, ordem);
    const totalPaginas = Math.max(1, Math.ceil(lista.length / limitePagina));
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
    const pagina = lista.slice((paginaAtual - 1) * limitePagina, paginaAtual * limitePagina);

    if (!pagina.length) {
      container.innerHTML = `<div class="nenhum-produto"><h3>Nenhum produto encontrado</h3><p>Tente escrever o nome de outra forma.</p></div>`;
      renderizarPaginacao(1);
      return;
    }

    container.innerHTML = pagina.map(produto => {
      const link = window.QABusca.linkProduto(produto);
      const imagem = produto.imagem || produto.images?.[0] || "img/placeholder.jpg";
      return `<div class="produto-card">
        <a href="${link}"><img src="${escapar(imagem)}" alt="${escapar(produto.nome)}" onerror="this.src='img/placeholder.jpg'"></a>
        <h3>${escapar(produto.nome || "Produto")}</h3>
        <p class="preco">${preco(produto)}</p>
        <a href="${link}" class="btn-ver">Ver produto</a>
      </div>`;
    }).join("");
    renderizarPaginacao(totalPaginas);
  }

  async function iniciar() {
    const titulo = document.getElementById("tituloCategoria");
    const breadcrumb = document.getElementById("breadcrumbCategoria");
    const contador = document.getElementById("quantidadeProdutos");
    const container = document.getElementById("listaProdutos");
    titulo.textContent = termo ? `Resultados para “${termo}”` : "Pesquisa de produtos";
    breadcrumb.textContent = "Pesquisa";

    if (!termo || termo.length < 2) {
      contador.textContent = "0";
      container.innerHTML = '<div class="nenhum-produto"><h3>Digite pelo menos duas letras</h3><p>Use a busca acima para encontrar um produto.</p></div>';
      return;
    }

    container.innerHTML = '<p class="categoria-carregando">Buscando produtos...</p>';
    try {
      produtosEncontrados = await window.QABusca.buscar(termo, 240);
      contador.textContent = String(produtosEncontrados.length);
      document.getElementById("ordenarProdutos")?.addEventListener("change", () => {
        paginaAtual = 1;
        renderizar();
      });
      renderizar();
    } catch (erro) {
      console.error("Erro na pesquisa:", erro);
      contador.textContent = "0";
      container.innerHTML = '<div class="nenhum-produto"><h3>Não foi possível concluir a pesquisa</h3><p>Atualize a página e tente novamente.</p></div>';
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
