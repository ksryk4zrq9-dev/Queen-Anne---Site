(function () {
  const chave = new URLSearchParams(window.location.search).get("produto");
  if (!chave) return;

  let produto;
  let varianteSelecionada;
  let imagemSelecionada = "img/placeholder.jpg";

  function money(valor) {
    return `U$ ${Number(valor || 0).toFixed(2)}`;
  }

  function escapar(valor) {
    const div = document.createElement("div");
    div.textContent = String(valor || "");
    return div.innerHTML;
  }

  function rotuloVariante(variante) {
    const atributos = [variante.cor, variante.tamanho, variante.memoria, variante.capacidade, variante.modelo].filter(Boolean);
    return atributos.length ? atributos.join(" · ") : variante.nome;
  }

  function atualizarImagem(variante) {
    imagemSelecionada = variante.imagem || produto.imagem || "img/placeholder.jpg";

    const hero = document.getElementById("pdpHeroImg");
    if (hero) {
      hero.src = imagemSelecionada;
      hero.alt = variante.nome || produto.nome;
      hero.onerror = () => {
        hero.onerror = null;
        hero.src = "img/placeholder.jpg";
      };
    }

    const miniatura = document.querySelector("#pdpThumbs img");
    if (miniatura) {
      miniatura.src = imagemSelecionada;
      miniatura.alt = variante.nome || produto.nome;
      miniatura.onerror = () => {
        miniatura.onerror = null;
        miniatura.src = "img/placeholder.jpg";
      };
    }
  }

  function atualizarVariante(variante) {
    varianteSelecionada = variante;
    atualizarImagem(variante);
    document.getElementById("pdpPrice").textContent = money(variante.preco);

    const specs = document.getElementById("pdpSpecsResumo");
    if (specs) {
      const especificacoesProduto = Object.entries(produto.especificacoes || {});
      const linhasVariante = [
        ["Cor", variante.cor],
        ["Tamanho", variante.tamanho],
        ["Memória", variante.memoria],
        ["Capacidade", variante.capacidade],
        ["Opção", variante.modelo],
        ["Disponibilidade", "Em estoque"]
      ].filter(([, valor]) => valor);

      const nomesVariante = new Set(linhasVariante.map(([nome]) => nome.toLocaleLowerCase("pt-BR")));
      const linhasProduto = especificacoesProduto.filter(([nome, valor]) =>
        valor !== null && valor !== "" && !nomesVariante.has(String(nome).toLocaleLowerCase("pt-BR"))
      );

      const linhas = [...linhasVariante, ...linhasProduto];

      specs.innerHTML = `<h3>Especificações</h3>${linhas.map(([nome, valor]) => `<div><strong>${escapar(nome)}</strong><span>${escapar(valor)}</span></div>`).join("")}`;
    }

    const mensagem = encodeURIComponent(`Olá! Tenho interesse no produto: ${variante.nome} - ${money(variante.preco)}`);
    document.getElementById("btnWhats").href = `https://wa.me/595987374159?text=${mensagem}`;
  }

  function renderizarSeletor() {
    if (!produto.variantes.length) return;

    const area = document.createElement("div");
    area.className = "catalogo-variantes";
    area.innerHTML = `
      <label for="seletorVariante">Escolha a opção</label>
      <select id="seletorVariante">
        ${produto.variantes.map((variante, indice) => `<option value="${indice}">${escapar(rotuloVariante(variante))} — ${money(variante.preco)}</option>`).join("")}
      </select>
    `;
    document.querySelector(".pdp-price-row")?.insertAdjacentElement("beforebegin", area);
    area.querySelector("select").addEventListener("change", event => atualizarVariante(produto.variantes[Number(event.target.value)]));
  }

  async function relacionados() {
    const box = document.getElementById("relacionados");
    if (!box) return;

    try {
      const resultado = await window.getCatalogoPagina({ categoria: produto.categoria, limite: 8, pagina: 1 });
      const lista = resultado.produtos.filter(item => item.produto_chave !== produto.produto_chave).slice(0, 8);
      box.innerHTML = lista.map(item => `
        <a href="produto.html?produto=${encodeURIComponent(item.produto_chave)}" class="pdp-rel-inner">
          <img src="${escapar(item.imagem || "img/placeholder.jpg")}" alt="${escapar(item.nome)}" onerror="this.src='img/placeholder.jpg'">
          <h4>${escapar(item.nome)}</h4><p>${money(item.preco_min)}</p>
        </a>`).join("");
    } catch (erro) {
      console.warn("Não foi possível carregar relacionados.", erro);
      box.innerHTML = "";
    }
  }

  async function carregar() {
    try {
      produto = await window.getCatalogoProduto(chave);
      if (!produto || !produto.variantes.length) throw new Error("Produto indisponível");

      document.getElementById("pdpTitle").textContent = produto.nome;
      document.getElementById("pdpDescFull").textContent = produto.descricao_longa || produto.descricao || "Consulte mais informações com nossa equipe.";

      const destaques = Array.isArray(produto.destaques) ? produto.destaques.filter(Boolean) : [];
      const listaDestaques = document.getElementById("pdpDestaques");
      if (listaDestaques) {
        listaDestaques.innerHTML = destaques.map(item => `<li>${escapar(item)}</li>`).join("");
        listaDestaques.hidden = destaques.length === 0;
      }
      const imagem = produto.imagem || produto.variantes[0]?.imagem || "img/placeholder.jpg";
      const hero = document.getElementById("pdpHeroImg");
      hero.src = imagem;
      hero.alt = produto.nome;
      hero.onerror = () => { hero.src = "img/placeholder.jpg"; };
      document.getElementById("pdpThumbs").innerHTML = `<button class="pdp-thumb active" type="button"><img src="${escapar(imagem)}" alt="${escapar(produto.nome)}" onerror="this.src='img/placeholder.jpg'"></button>`;

      renderizarSeletor();
      atualizarVariante(produto.variantes[0]);

      document.getElementById("btnAddCart").onclick = () => {
        const carrinho = QAStorage.obterCarrinho();
        carrinho.push({
          id: varianteSelecionada.numero_cadastro,
          numero_cadastro: varianteSelecionada.numero_cadastro,
          produto_chave: produto.produto_chave,
          nome: varianteSelecionada.nome,
          preco: Number(varianteSelecionada.preco),
          imagem: imagemSelecionada
        });
        QAStorage.salvarCarrinho(carrinho);
        if (typeof atualizarContadorCarrinho === "function") atualizarContadorCarrinho();
        if (typeof mostrarToastCarrinho === "function") mostrarToastCarrinho();
      };

      if (window.QAAnalytics) {
        window.QAAnalytics.track("produto_visualizado", {
          codigo_produto: varianteSelecionada.numero_cadastro,
          nome_produto: produto.nome
        });
      }

      relacionados();
    } catch (erro) {
      console.error("Erro ao carregar produto do catálogo:", erro);
      document.getElementById("pdpTitle").textContent = "Produto não encontrado";
    } finally {
      document.getElementById("conteudoProduto")?.classList.remove("pdp-carregando");
      const loading = document.getElementById("loadingProduto");
      if (loading) loading.style.display = "none";
    }
  }

  document.addEventListener("DOMContentLoaded", carregar);
})();
