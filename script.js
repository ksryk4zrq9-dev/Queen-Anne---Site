function obterClienteLogado() {
  try {
    return JSON.parse(localStorage.getItem("qa_cliente_logado")) || null;
  } catch (erro) {
    return null;
  }
}

function obterChaveProdutosVistos() {
  const cliente = obterClienteLogado();
  const email = String(cliente?.email || "")
    .trim()
    .toLowerCase();

  return email
    ? `qa_produtos_vistos_${email}`
    : "qa_produtos_vistos_visitante";
}document.addEventListener("DOMContentLoaded", async function () {
  // ===== CARREGAR HEADER E FOOTER =====
  const headerEl = document.getElementById("header");
  const footerEl = document.getElementById("footer");

  if (headerEl) {
    fetch("header.html")
      .then(res => {
        if (!res.ok) throw new Error("Header não encontrado");
        return res.text();
      })
      .then(html => {
  headerEl.innerHTML = html;

  function obterChaveCarrinho() {
  let clienteLogado = null;

  try {
    clienteLogado =
      JSON.parse(localStorage.getItem("qa_cliente_logado")) || null;
  } catch (erro) {
    console.error("Erro ao ler cliente logado:", erro);
  }

  const email = String(clienteLogado?.email || "")
    .trim()
    .toLowerCase();

  return email
    ? `qa_carrinho_${email}`
    : "qa_carrinho_visitante";
}



  // Atualiza o contador depois que o header já existe na tela
  atualizarContadorCarrinho();

  // Ativa a busca nas páginas que usam apenas script.js
  if (!document.querySelector('script[src="busca-inteligente.js"]')) {
    const buscaScript = document.createElement("script");
    buscaScript.src = "busca-inteligente.js";
    document.body.appendChild(buscaScript);
  }
})
      .catch(err => console.error("Erro ao carregar header:", err));
  }

  if (footerEl) {
    fetch("footer.html")
      .then(res => {
        if (!res.ok) throw new Error("Footer não encontrado");
        return res.text();
      })
      .then(html => {
        footerEl.innerHTML = html;
      })
      .catch(err => console.error("Erro ao carregar footer:", err));
  }
  // ===== PRODUTOS =====

// Usa temporariamente os produtos locais do produto.js
let produtos = [];

async function carregarProdutosDoSite() {
  try {
    if (typeof window.getProdutos !== "function") {
      throw new Error(
        "A função getProdutos não foi carregada."
      );
    }

    const dadosSupabase =
      await window.getProdutos();

    if (
      !Array.isArray(dadosSupabase) ||
      dadosSupabase.length === 0
    ) {
      throw new Error(
        "O Supabase não retornou produtos."
      );
    }

    produtos = dadosSupabase.map(produto => ({
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

   window.produtos = produtos;

console.log(
  `${produtos.length} produtos carregados do Supabase.`
);

window.dispatchEvent(
  new CustomEvent("qa:produtos-carregados", {
    detail: {
      produtos: produtos
    }
  })
);

   } catch (erro) {
    console.error(
      "Não foi possível carregar os produtos do Supabase:",
      erro
    );

    produtos = [];
    window.produtos = [];
  }

  const params =
  new URLSearchParams(
    window.location.search
  );

const categoriaUrl =
  params.get("cat") || "Todos";

const paginaAtual =
  window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

if (paginaAtual === "categoria.html") {
  const params =
    new URLSearchParams(
      window.location.search
    );

  const categoriaUrl =
    params.get("cat") || "Todos";

  const paginaAtual =
  window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

if (
  paginaAtual !==
  "categoria.html"
) {
  renderProdutos("Todos");
}
} else {
  renderProdutos("Todos");
}

carregarProdutosParaVoce();
montarSlider();
}

const paginaAtual =
  window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

if (paginaAtual !== "categoria.html") {
  carregarProdutosDoSite();
}

  // ===== CONTADOR CARRINHO =====
// Menu lateral de categorias (usado no header)
function toggleCategorias() {
  const el = document.getElementById("categoriasLateral");
  if (!el) return;
  el.classList.toggle("aberto");
}

// deixa a funcao disponivel globalmente (onclick no HTML)
window.toggleCategorias = toggleCategorias;

function atualizarContadorCarrinho() {
  let carrinho = [];

  if (
    window.QAStorage &&
    typeof window.QAStorage.obterCarrinho === "function"
  ) {
    carrinho = window.QAStorage.obterCarrinho();
  } else {
    console.warn(
      "cliente-storage.js não foi carregado antes do script.js."
    );
  }

  const contador =
    document.getElementById("contadorCarrinho");

  if (contador) {
    contador.innerText = carrinho.length;
  }
}
window.atualizarContadorCarrinho =
  atualizarContadorCarrinho;

if (window.QAStorage) {
  window.addEventListener(
    "qa:carrinho-atualizado",
    atualizarContadorCarrinho
  );
}

atualizarContadorCarrinho();

  // ===== ELEMENTOS =====
  const listaProdutos = document.getElementById("listaProdutos");
  botoesCategorias.forEach(botao => {
  botao.addEventListener("click", function () {
    const categoria =
      this.dataset.categoria ||
      this.textContent.trim();

    renderProdutos(categoria);
  });
});
  const campoBusca = document.getElementById("buscaProduto");

  // ===== NORMALIZAR TEXTO =====
  function normalizar(txt) {
    return txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // ===== RENDER PRODUTOS =====
   function renderProdutos(cat = "Todos", termo = "") {
  if (!listaProdutos) return;

  listaProdutos.innerHTML = "";

  const categoriaSelecionada =
    normalizar(String(cat || "Todos").trim());

  const termoBusca =
    normalizar(String(termo || "").trim());

  const produtosFiltrados = produtos.filter(p => {
    const categoriaProduto =
      normalizar(
        String(p.categoria || "").trim()
      );

    const nomeProduto =
      normalizar(
        String(p.nome || "").trim()
      );

    const correspondeCategoria =
      categoriaSelecionada === "todos" ||
      categoriaProduto === categoriaSelecionada;

    const correspondeBusca =
      nomeProduto.includes(termoBusca);

    return (
      correspondeCategoria &&
      correspondeBusca
    );
  });

  produtosFiltrados.forEach(p => {
    const link =
      `produto.html?id=${p.id}`;

    listaProdutos.innerHTML += `
      <div class="produto-card">
        <a href="${link}">
          <img
            src="${p.images?.[0] || p.imagem || "img/placeholder.jpg"}"
            alt="${p.nome}"
          >
        </a>

        <h3>${p.nome}</h3>

        <p class="preco">
          U$ ${Number(p.preco).toFixed(2)}
        </p>

        <a href="${link}" class="btn-ver">
          Ver produto
        </a>
      </div>
    `;
  });

  if (produtosFiltrados.length === 0) {
    listaProdutos.innerHTML = `
      <div class="nenhum-produto">
        <h3>Nenhum produto encontrado</h3>
        <p>
          Ainda não há produtos cadastrados nesta categoria.
        </p>
      </div>
    `;
  }
}




  // ===== INICIAL =====
  

// ===== BANNER HOME =====
const banners = [
  "img/banner1.jpg",
  "img/banner2.jpg",
  "img/banner3.jpg",
  "img/banner4.jpg",
  "img/banner5.jpg",
  "img/banner6.jpg"
];

let bannerAtual = 0;
let usandoBannerA = true;
let bannerTimer = null;

const bannerImgA = document.getElementById("bannerImgA");
const bannerImgB = document.getElementById("bannerImgB");
const bannerAntigo = document.getElementById("bannerImg");

const btnPrev = document.getElementById("prevBanner");
const btnNext = document.getElementById("nextBanner");

function trocarBanner(index) {
  if (bannerImgA && bannerImgB) {
    const imgAtual = usandoBannerA ? bannerImgA : bannerImgB;
    const imgProxima = usandoBannerA ? bannerImgB : bannerImgA;

    imgProxima.classList.remove("ativo");

    const aplicarTroca = () => {
      requestAnimationFrame(() => {
        imgProxima.classList.add("ativo");
        imgAtual.classList.remove("ativo");
        usandoBannerA = !usandoBannerA;
      });
    };

    imgProxima.onload = aplicarTroca;
    imgProxima.onerror = aplicarTroca;

    imgProxima.src = banners[index];

    if (imgProxima.complete) {
      aplicarTroca();
    }

    return;
  }

  if (bannerAntigo) {
    bannerAntigo.src = banners[index];
  }
}

function proximoBanner() {
  bannerAtual = (bannerAtual + 1) % banners.length;
  trocarBanner(bannerAtual);
}

function bannerAnterior() {
  bannerAtual = (bannerAtual - 1 + banners.length) % banners.length;
  trocarBanner(bannerAtual);
}

function reiniciarBannerAutomatico() {
  if (bannerTimer) {
    clearInterval(bannerTimer);
  }

}

if (btnNext) {
  btnNext.onclick = () => {
    proximoBanner();
    reiniciarBannerAutomatico();
  };
}

if (btnPrev) {
  btnPrev.onclick = () => {
    bannerAnterior();
    reiniciarBannerAutomatico();
  };
}

if (bannerImgA) {
  bannerImgA.src = banners[0];
  bannerImgA.classList.add("ativo");
}

if (bannerImgB) {
  bannerImgB.src = banners[0];
  bannerImgB.classList.remove("ativo");
}

reiniciarBannerAutomatico();

// Troca automática
setInterval(proximoBanner, 5000);
  function embaralhar(lista) {
    return [...lista].sort(() => Math.random() - 0.5);
  }

 function criarCardProduto(p, prioridade = false) {
  const link =
    `produto.html?id=${p.id}`;

  const imagem =
    p.images?.[0] ||
    p.imagem ||
    "img/placeholder.jpg";

  const carregamentoImagem =
    prioridade
      ? `
        loading="eager"
        fetchpriority="high"
      `
      : `
        loading="lazy"
        fetchpriority="low"
      `;

  return `
    <div class="produto-card">
      <a href="${link}">
        <img
          src="${imagem}"
          alt="${p.nome || "Produto"}"
          ${carregamentoImagem}
          decoding="async"
          width="300"
          height="300"
        >
      </a>

      <h3>
        ${p.nome || "Produto"}
      </h3>

      <p class="preco">
        U$ ${Number(
          p.preco || 0
        ).toFixed(2)}
      </p>

      <a
        href="${link}"
        class="btn-ver"
      >
        Ver produto
      </a>
    </div>
  `;
}

const linha1 = document.getElementById("linha1");
const linha2 = document.getElementById("linha2");

 function montarSlider() {
  const linha1 =
    document.getElementById("linha1");

  const linha2 =
    document.getElementById("linha2");

  if (!linha1 || !linha2) {
    return;
  }

  linha1.innerHTML = "";
  linha2.innerHTML = "";

  const lista = embaralhar(produtos);

  lista.forEach((p, i) => {
  const destino =
    i % 2 === 0
      ? linha1
      : linha2;

  const prioridade =
    i < 12;

  destino.insertAdjacentHTML(
    "beforeend",
    criarCardProduto(
      p,
      prioridade
    )
  );
});

  // clona os cards para loop real
  const clone1 = linha1.innerHTML;
  const clone2 = linha2.innerHTML;

  linha1.innerHTML += clone1;
  linha2.innerHTML += clone2;
}
const imagensLinha1 =
  linha1.querySelectorAll("img");

const imagensLinha2 =
  linha2.querySelectorAll("img");

[...imagensLinha1, ...imagensLinha2]
  .forEach((imagem, indice) => {
    if (indice >= 12) {
      imagem.loading = "lazy";
      imagem.fetchPriority = "low";
    }
  });
function carregarProdutosParaVoce() {
  const area =
    document.getElementById(
      "produtosParaVoce"
    );

  if (!area) {
    return;
  }

  if (
    !Array.isArray(produtos) ||
    produtos.length === 0
  ) {
    area.innerHTML = "";
    return;
  }

  const vistos =
    window.QAStorage &&
    typeof window.QAStorage.obterProdutosVistos ===
      "function"
      ? window.QAStorage.obterProdutosVistos()
      : [];

  const secao =
    area.closest(
      ".produtos-para-voce"
    );

  if (secao) {
    secao.style.display = "block";
  }

  let listaParaMostrar = [];

  if (vistos.length > 0) {
  listaParaMostrar = vistos
    .map(visto => {
      return produtos.find(
        produto =>
          String(produto.id) ===
          String(visto.id)
      );
    })
    .filter(Boolean)
    .filter(p =>
      !String(p.nome || "")
        .toLowerCase()
        .includes("triciclo")
    )
    .map(p => ({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      imagem:
        p.images?.[0] ||
        p.imagem ||
        "img/placeholder.jpg",
      url: `produto.html?id=${p.id}`
    }));
} else {
  listaParaMostrar = produtos
    .filter(p => !String(p.nome || "").toLowerCase().includes("triciclo"))
    .slice(0, 14)
    .map(p => ({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      imagem: p.images?.[0] || "img/placeholder.jpg",
      url: `produto.html?id=${p.id}`
    }));
}

  area.innerHTML = listaParaMostrar.map(produto => {
    const link = produto.url || `produto.html?id=${produto.id}`;

    const imagem =
      produto.imagem ||
      produto.image ||
      produto.images?.[0] ||
      "img/placeholder.jpg";

    const preco = Number(produto.preco || 0).toFixed(2);

    return `
      <div class="produto-card">
        <a href="${link}">
          <img src="${imagem}" alt="${produto.nome}">
        </a>

        <h3>${produto.nome}</h3>

        <p class="preco">U$ ${preco}</p>

        <a href="${link}" class="btn-ver">Ver produto</a>
      </div>
    `;
  }).join("");

  const prev = document.querySelector(".pfv-car-left");
  const next = document.querySelector(".pfv-car-right");

  function atualizarSetas() {
    if (!prev || !next) return;

    prev.style.display = "flex";
    next.style.display = "flex";

    prev.style.opacity = "1";
    next.style.opacity = "1";

    prev.style.visibility = "visible";
    next.style.visibility = "visible";

    prev.style.pointerEvents = "auto";
    next.style.pointerEvents = "auto";
  }

  if (prev) {
    prev.onclick = () => {
      area.scrollBy({
        left: -520,
        behavior: "smooth"
      });
    };
  }

  if (next) {
    next.onclick = () => {
      area.scrollBy({
        left: 520,
        behavior: "smooth"
      });
    };
  }

  area.addEventListener("scroll", atualizarSetas);

  setTimeout(atualizarSetas, 100);
  setTimeout(atualizarSetas, 700);
}


});
window.addEventListener("load", () => {
  document.querySelectorAll(".linha").forEach(linha => {
    linha.style.animation = "none";
    linha.offsetHeight; // força reflow
    linha.style.animation = "";
  });
});

function criarWhatsFloat() {
  if (document.getElementById("whatsFloatBox")) return;

  const box = document.createElement("div");
  box.className = "whats-float-box";
  box.id = "whatsFloatBox";

  box.innerHTML = `
    <button class="whats-float-main" type="button" aria-label="Atendimento WhatsApp">
      <i class="fa-brands fa-whatsapp"></i>
    </button>

    <div class="whats-float-panel" id="whatsFloatPanel">

      <div class="whats-float-head">
        <strong>Atendimento por setor</strong>
        <span>Escolha o departamento</span>
      </div>

      <a href="https://wa.me/595982932330" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Casa e Cozinha</strong><span>+595 982 932330</span></div>
      </a>

      <a href="https://wa.me/595986302758" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Bebidas</strong><span>+595 986 302758</span></div>
      </a>

      <a href="https://wa.me/595981324377" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Celulares e Automotivo</strong><span>+595 981 324377</span></div>
      </a>

      <a href="https://wa.me/595986304329" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Estética</strong><span>+595 986 304329</span></div>
      </a>

      <a href="https://wa.me/595981757288" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Informática</strong><span>+595 981 757288</span></div>
      </a>

      <a href="https://wa.me/595981693688" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Música e Receptores</strong><span>+595 981 693688</span></div>
      </a>

      <a href="https://wa.me/595982933040" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Óculos e Relógios</strong><span>+595 982 933040</span></div>
      </a>

      <a href="https://wa.me/595981756388" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Perfumaria</strong><span>+595 981 756388</span></div>
      </a>

      <a href="https://wa.me/595981726488" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Pesca e Ferramentas</strong><span>+595 981 726488</span></div>
      </a>

      <a href="https://wa.me/595985902140" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Vestuário</strong><span>+595 985 902140</span></div>
      </a>

      <a href="https://wa.me/595985902141" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i>
        <div><strong>Assistência</strong><span>+595 985 902141</span></div>
      </a>

    </div>
  `;

  document.body.appendChild(box);

  const botao = box.querySelector(".whats-float-main");

  botao.addEventListener("click", function(event) {
    event.stopPropagation();
    box.classList.toggle("ativo");
  });

  box.addEventListener("click", function(event) {
    event.stopPropagation();
  });
}

document.addEventListener("DOMContentLoaded", criarWhatsFloat);

window.addEventListener(
  "qa:produtos-carregados",
  function () {
    if (
      typeof window.carregarProdutosParaVoce ===
      "function"
    ) {
      window.carregarProdutosParaVoce();
    }
  }
);
document.addEventListener("click", function() {
  const box = document.getElementById("whatsFloatBox");
  if (box) box.classList.remove("ativo");
});
document.addEventListener(
  "mouseover",
  function (event) {
    const link =
      event.target.closest(
        'a[href^="produto.html?id="]'
      );

    if (!link) {
      return;
    }

    const href =
      link.getAttribute("href");

    if (!href) {
      return;
    }

    if (
      document.querySelector(
        `link[rel="prefetch"][href="${href}"]`
      )
    ) {
      return;
    }

    const prefetch =
      document.createElement("link");

    prefetch.rel = "prefetch";
    prefetch.href = href;

    document.head.appendChild(prefetch);
  }
);
