(function () {
  let buscaAtivada = false;

  function normalizar(txt) {
    return String(txt || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

 function linkProduto(p) {
  return `produto.html?id=${encodeURIComponent(p.id)}`;
}

  function textoBusca(p) {
    const nome = normalizar(p.nome);
    let extra = "";

    if (nome.includes("ps5") || nome.includes("playstation")) {
      extra += " pl play playstation play station ps5 sony console videogame game games ";
    }
    if (nome.includes("iphone")) extra += " ip iphone apple celular smartphone ";
    if (nome.includes("xiaomi") || nome.includes("poco")) extra += " xi xiaomi poco celular smartphone android ";
    if (nome.includes("samsung")) extra += " samsung galaxy celular smartphone tv ";
    if (nome.includes("jbl")) extra += " jbl som audio caixa soundbar bluetooth ";

    return normalizar(`
      ${p.nome || ""}
      ${p.desc || ""}
      ${p.descricao || ""}
      ${p.categoria || ""}
      ${extra}
    `);
  }

 async function garantirProdutos() {
  try {
    if (typeof window.getProdutos !== "function") {
      throw new Error(
        "A função getProdutos não está disponível."
      );
    }

    const lista = await window.getProdutos();

    if (!Array.isArray(lista)) {
      throw new Error(
        "O Supabase não retornou uma lista válida."
      );
    }

    window.produtos = lista.map(produto => ({
      ...produto,

      id: Number(produto.id),

      preco: Number(produto.preco) || 0,

      images: [
        produto.imagem ||
        produto.images?.[0] ||
        "img/placeholder.jpg"
      ],

      desc:
        produto.descricao ||
        produto.desc ||
        ""
    }));

    console.log(
      `${window.produtos.length} produtos carregados na busca pelo Supabase.`
    );

  } catch (erro) {
    console.error(
      "Não foi possível carregar os produtos da busca:",
      erro
    );

    if (!Array.isArray(window.produtos)) {
      window.produtos = [];
    }
  }
}

  function buscarProdutos(termo) {
  if (!Array.isArray(window.produtos)) return [];

  const termoNormalizado = normalizar(termo).trim();

  return window.produtos
    .map(p => {
      const nome = normalizar(p.nome).trim();
      const palavrasNome = nome.split(/\s+/);

      let pontos = 0;

      // Nome começa exatamente com o termo
      if (nome.startsWith(termoNormalizado)) {
        pontos += 100;
      }

      // Alguma palavra do nome começa com o termo
      if (
        palavrasNome.some(
          palavra => palavra.startsWith(termoNormalizado)
        )
      ) {
        pontos += 80;
      }

      // O nome contém o termo em qualquer posição
      if (nome.includes(termoNormalizado)) {
        pontos += 60;
      }

      return {
        produto: p,
        pontos
      };
    })
    .filter(item => item.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, 8)
    .map(item => item.produto);
}

  function renderizarResultados(encontrados, resultado) {
    resultado.innerHTML = "";

    if (!encontrados.length) {
      resultado.style.display = "none";
      return;
    }

    encontrados.forEach(p => {
  const item = document.createElement("div");

  item.className = "busca-item";

  const imagem =
    p.imagem ||
    p.images?.[0] ||
    "img/placeholder.jpg";

  item.innerHTML = `
    <img
      src="${imagem}"
      alt="${p.nome || "Produto"}"
    >

    <span>
      ${p.nome || "Produto"}
    </span>
  `;

  item.addEventListener("click", function () {
    window.location.href =
      `produto.html?id=${encodeURIComponent(p.id)}`;
  });

  resultado.appendChild(item);
});

    resultado.style.display = "block";
  }

  async function ativarBusca() {
    if (buscaAtivada) return;

    const campo = document.getElementById("buscaProduto");
    const resultado = document.getElementById("resultadoBusca");
    const botao = document.querySelector(".btn-busca-header");

    if (!campo || !resultado) return;

    buscaAtivada = true;
    await garantirProdutos();

    function executarBusca(navegar = false) {
      const termo = normalizar(campo.value);
      resultado.innerHTML = "";

      if (termo.length < 2) {
        resultado.style.display = "none";
        return;
      }

      const encontrados = buscarProdutos(termo);

      if (navegar && encontrados.length) {
        window.location.href = linkProduto(encontrados[0]);
        return;
      }

      renderizarResultados(encontrados, resultado);
    }

    campo.addEventListener("input", () => executarBusca(false));

    campo.addEventListener("keydown", function (e) {
      if (e.key === "Enter") executarBusca(true);
    });

    if (botao) {
      botao.addEventListener("click", () => executarBusca(true));
    }

    document.addEventListener("click", function (e) {
      if (!campo.contains(e.target) && !resultado.contains(e.target)) {
        resultado.style.display = "none";
      }
    });
  }

  function carregarHeaderDepoisAtivarBusca() {
    const header = document.getElementById("header");

    // Páginas como categoria.html já possuem header direto no HTML.
    if (!header) {
      ativarBusca();
      return;
    }

    // Se o header já foi carregado por outro script, apenas ativa a busca.
    if (header.innerHTML.trim()) {
      ativarBusca();
      return;
    }

    fetch("header.html")
      .then(r => r.text())
      .then(html => {
        header.innerHTML = html;

        const contador = document.getElementById("contadorCarrinho");
        const chaveCarrinho = obterChaveCarrinho();

const carrinho =
  JSON.parse(
    localStorage.getItem(chaveCarrinho)
  ) || [];
        if (contador) contador.innerText = carrinho.length;

        ativarBusca();
      })
      .catch(e => console.warn("Não foi possível carregar o header.", e));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", carregarHeaderDepoisAtivarBusca);
  } else {
    carregarHeaderDepoisAtivarBusca();
  }
})();

/* =====================================================
   BUSCA — NAVEGAÇÃO COM SETAS, ENTER E ESC
   Funciona mesmo com header carregado via fetch
===================================================== */

let qaBuscaIndex = -1;

document.addEventListener("keydown", function (e) {
  const inputBusca =
    document.querySelector(".busca-grande") ||
    document.querySelector("#campoBusca") ||
    document.querySelector("input[type='search']");

  const resultadoBusca =
    document.querySelector(".resultado-busca") ||
    document.querySelector("#resultadoBusca");

  if (!inputBusca || !resultadoBusca) return;

  const focoEstaNaBusca = document.activeElement === inputBusca;

  if (!focoEstaNaBusca) return;

  const itens = Array.from(resultadoBusca.querySelectorAll(".busca-item"));

  const dropdownAberto =
    resultadoBusca.style.display !== "none" &&
    resultadoBusca.offsetParent !== null &&
    itens.length > 0;

  if (!dropdownAberto) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();

    qaBuscaIndex++;

    if (qaBuscaIndex >= itens.length) {
      qaBuscaIndex = 0;
    }

    qaMarcarItemBusca(itens);
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();

    qaBuscaIndex--;

    if (qaBuscaIndex < 0) {
      qaBuscaIndex = itens.length - 1;
    }

    qaMarcarItemBusca(itens);
  }

  if (e.key === "Enter") {
    if (qaBuscaIndex >= 0 && itens[qaBuscaIndex]) {
      e.preventDefault();
      itens[qaBuscaIndex].click();
    }
  }

  if (e.key === "Escape") {
    resultadoBusca.style.display = "none";
    qaBuscaIndex = -1;
  }
});

document.addEventListener("input", function (e) {
  if (
    e.target.matches(".busca-grande") ||
    e.target.matches("#campoBusca") ||
    e.target.matches("input[type='search']")
  ) {
    qaBuscaIndex = -1;
  }
});

document.addEventListener("mouseover", function (e) {
  const item = e.target.closest(".busca-item");
  if (!item) return;

  const resultadoBusca =
    document.querySelector(".resultado-busca") ||
    document.querySelector("#resultadoBusca");

  if (!resultadoBusca) return;

  const itens = Array.from(resultadoBusca.querySelectorAll(".busca-item"));
  qaBuscaIndex = itens.indexOf(item);

  qaMarcarItemBusca(itens);
});

function qaMarcarItemBusca(itens) {
  itens.forEach(item => {
    item.classList.remove("busca-item-ativo");
  });

  const itemAtual = itens[qaBuscaIndex];

  if (!itemAtual) return;

  itemAtual.classList.add("busca-item-ativo");

  itemAtual.scrollIntoView({
    block: "nearest"
  });
}
