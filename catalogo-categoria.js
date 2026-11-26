(function () {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("cat") || "Todos";
  let paginaAtual = Math.max(1, Number(params.get("pagina")) || 1);

  // Reutiliza as consultas durante a navegação nesta categoria.
  let produtosAntigosPromise;
  let catalogoPromise;

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
    if (!produtosAntigosPromise) {
      // Consulta diretamente, sem aguardar o evento de outro script.
      produtosAntigosPromise = Promise.resolve()
        .then(() => window.getProdutos())
        .catch(erro => {
          produtosAntigosPromise = null;
          throw erro;
        });
    }

    return produtosAntigosPromise;
  }

  async function carregarCatalogoNovo() {
    if (!catalogoPromise) {
      catalogoPromise = (async () => {
        const primeira = await window.getCatalogoPagina({
          categoria,
          pagina: 1,
          limite: 48,
          ordem: "nome"
        });
        const produtos = [...primeira.produtos];

        // Carrega até quatro páginas simultaneamente.
        for (
          let inicio = 2;
          inicio <= primeira.totalPaginas;
          inicio += 4
        ) {
          const consultas = [];

          for (
            let pagina = inicio;
            pagina < inicio + 4 && pagina <= primeira.totalPaginas;
            pagina += 1
          ) {
            consultas.push(
              window.getCatalogoPagina({
                categoria,
                pagina,
                limite: 48,
                ordem: "nome"
              })
            );
          }

          const resultados = await Promise.all(consultas);

          for (const resultado of resultados) {
            produtos.push(...resultado.produtos);
          }
        }

        return produtos.map(produto => ({
          ...produto,
          origem: "catalogo"
        }));
      })().catch(erro => {
        catalogoPromise = null;
        throw erro;
      });
    }

    return catalogoPromise;
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

  const limitePagina = 24;
  let produtosPorInteressePromise;

  function lerInteresse() {
    try {
      return normalizar(sessionStorage.getItem("qa:ultima-busca")).match(/[a-z0-9]+/g) || [];
    } catch {
      return [];
    }
  }

  const interesse = lerInteresse();

  async function carregarProdutosPorInteresse() {
    const primeira = await window.getCategoriaPagina({
      categoria, pagina: 1, limite: 48, ordem: "relevancia"
    });
    const produtos = [...primeira.produtos];

    for (let inicio = 2; inicio <= primeira.totalPaginas; inicio += 4) {
      const quantidade = Math.min(4, primeira.totalPaginas - inicio + 1);
      const paginas = await Promise.all(Array.from({ length: quantidade }, (_, indice) =>
        window.getCategoriaPagina({
          categoria, pagina: inicio + indice, limite: 48, ordem: "relevancia"
        })
      ));
      for (const pagina of paginas) produtos.push(...pagina.produtos);
    }

    const palavraPrincipal = interesse.find(palavra => /[a-z]/.test(palavra));
    const pontuar = produto => {
      const nome = normalizar(produto.nome).match(/[a-z0-9]+/g) || [];
      if (!nome.includes(palavraPrincipal)) return 0;
      return interesse.filter(palavra => nome.includes(palavra)).length;
    };

    return produtos
      .map(produto => ({ produto, pontos: pontuar(produto) }))
      .sort((a, b) => b.pontos - a.pontos)
      .map(item => item.produto);
  }

  async function consultarPagina(ordem) {
    if (ordem === "relevancia" && categoria !== "Todos" && interesse.some(palavra => /[a-z]/.test(palavra))) {
      try {
        produtosPorInteressePromise ||= carregarProdutosPorInteresse().catch(erro => {
          produtosPorInteressePromise = undefined;
          throw erro;
        });
        const produtos = await produtosPorInteressePromise;
        const totalPaginas = Math.max(1, Math.ceil(produtos.length / limitePagina));
        const pagina = Math.min(Math.trunc(paginaAtual), totalPaginas);
        const inicio = (pagina - 1) * limitePagina;
        return {
          pagina, totalPaginas, total: produtos.length,
          produtos: produtos.slice(inicio, inicio + limitePagina)
        };
      } catch {
        // Se a personalização falhar, mantém a página padrão do catálogo.
      }
    }

    return window.getCategoriaPagina({ categoria, pagina: paginaAtual, limite: limitePagina, ordem });
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

    const requisicaoAtual = (carregar.requisicao || 0) + 1;
    carregar.requisicao = requisicaoAtual;

    container.innerHTML =
      '<p class="categoria-carregando">Carregando produtos...</p>';

    container.setAttribute("aria-busy", "true");

    if (contador) contador.textContent = "…";

    const paginacao = document.getElementById("catalogoPaginacao");
    if (paginacao) paginacao.innerHTML = "";

    try {
      const resultado = await consultarPagina(ordenar?.value || "relevancia");

      if (carregar.requisicao !== requisicaoAtual) return;

      paginaAtual = Number(resultado.pagina);
      atualizarUrl();

      const produtosPagina = resultado.produtos;
      const totalPaginas = Number(resultado.totalPaginas);

      if (contador) {
        contador.textContent = String(resultado.total);
      }

      if (!produtosPagina.length) {
        container.innerHTML =
          '<div class="nenhum-produto">' +
          '<h3>Nenhum produto encontrado</h3>' +
          '<p>Ainda não há produtos cadastrados nesta categoria.</p>' +
          '</div>';

        renderizarPaginacao(1);
        return;
      }

      container.innerHTML = produtosPagina.map((produto, indice) => {
        const link = produto.origem === "antigo"
          ? `produto.html?id=${encodeURIComponent(produto.id)}`
          : `produto.html?produto=${encodeURIComponent(produto.produto_chave)}`;

        return `
          <div class="produto-card">
            <a href="${link}">
              <img
                src="${escapar(produto.imagem || "img/placeholder.jpg")}"
                alt="${escapar(produto.nome)}"
                loading="${indice < 8 ? "eager" : "lazy"}"
                decoding="async"
                width="300"
                height="300"
                onerror="this.onerror=null;this.src='img/placeholder.jpg'"
              >
            </a>
            <h3>${escapar(produto.nome || "Produto")}</h3>
            <p class="preco">${preco(produto)}</p>
            <a href="${link}" class="btn-ver">Ver produto</a>
          </div>`;
      }).join("");

      renderizarPaginacao(totalPaginas);
    } catch (erro) {
      if (carregar.requisicao !== requisicaoAtual) return;

      console.error("Erro ao carregar a categoria:", erro);

      container.innerHTML =
        '<div class="nenhum-produto">' +
        '<h3>Não foi possível carregar os produtos</h3>' +
        '<p>Atualize a página e tente novamente.</p>' +
        '</div>';

      if (contador) contador.textContent = "0";
    } finally {
      if (carregar.requisicao === requisicaoAtual) {
        container.setAttribute("aria-busy", "false");
      }
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
