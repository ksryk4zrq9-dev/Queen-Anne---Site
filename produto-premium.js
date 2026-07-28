// produto-premium.js
function money(v){
  const n = Number(v || 0);
  return `U$ ${n.toFixed(2)}`;
}

function getIdFromUrl(){
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  return id ? Number(id) : null;
}

// Title Case pt-BR (mantém "de/da/do/das/dos/e" minúsculo no meio)
function titleCasePtBR(str){
  const keepLower = new Set(["de","da","do","das","dos","e","em","no","na","nos","nas","para","por","com"]);
  const s = String(str || "").trim().replace(/\s+/g, " ");
  if(!s) return "";
  const parts = s.split(" ");
  return parts.map((w, i) => {
    const lw = w.toLowerCase();
    if(i > 0 && keepLower.has(lw)) return lw;
    return lw.charAt(0).toUpperCase() + lw.slice(1);
  }).join(" ");
}

function setupReveal(){
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el=>io.observe(el));
}

// animação
const style = document.createElement("style");
style.textContent = `
  .reveal{opacity:0; transform: translateY(18px); transition: opacity .65s ease, transform .65s ease;}
  .reveal.is-visible{opacity:1; transform: translateY(0);}
`;
document.head.appendChild(style);

function hideLoadingAndMeta(){
  // 2) tira "Carregando..." (se existir em qualquer lugar)
  document.querySelectorAll("[data-loading], .loading, #loading, .pdp-loading").forEach(el=>{
    el.style.display = "none";
  });

  // se tiver placeholders de texto
  const t = document.getElementById("pdpTitle");
  const d = document.getElementById("pdpDesc");
  const tg = document.getElementById("pdpTagline");
  if(t && /carregando/i.test(t.textContent)) t.textContent = "";
  if(d && /carregando/i.test(d.textContent)) d.textContent = "";
  if(tg && /carregando/i.test(tg.textContent)) tg.textContent = "";

  // 3) remove categoria e id (se existirem)
  const meta = document.getElementById("pdpMeta");
  if(meta) meta.style.display = "none";
  const cat = document.getElementById("pdpCategoria");
  if(cat) cat.style.display = "none";
  const pid = document.getElementById("pdpId");
  if(pid) pid.style.display = "none";
}

async function loadProduct(){
  hideLoadingAndMeta();

  const id = getIdFromUrl();
  if(!id){
    const titleEl = document.getElementById("pdpTitle");
    if(titleEl) titleEl.textContent = "Produto não informado";
    return;
  }

  let p = null;

try {
  if (typeof window.getProdutoPorId !== "function") {
    throw new Error(
      "A função getProdutoPorId não foi carregada."
    );
  }

  p = await window.getProdutoPorId(id);

  if (p) {
    p = {
      ...p,

      id: Number(p.id),

      preco: Number(p.preco) || 0,

      images: [
        p.imagem ||
        p.images?.[0] ||
        "img/placeholder.jpg"
      ],

      desc:
        p.descricao ||
        p.desc ||
        ""
    };
  }

} catch (e) {
  console.error(
    "Erro ao buscar o produto no Supabase:",
    e
  );
}

if (!p) {
  const titleEl =
    document.getElementById("pdpTitle");

  if (titleEl) {
    titleEl.textContent =
      "Produto não encontrado";
  }

  console.error(
    `Nenhum produto encontrado no Supabase para o ID ${id}.`
  );

  return;
}

if(!p){
  const titleEl = document.getElementById("pdpTitle");
  if(titleEl) titleEl.textContent = "Produto não encontrado";
  return;
}

salvarProdutoVisto(p);
  // 1) nome com iniciais maiúsculas
  const nome = titleCasePtBR(p.nome || "Produto");

  const titleEl = document.getElementById("pdpTitle");
  if(titleEl) titleEl.textContent = nome;

  const priceEl = document.getElementById("pdpPrice");
  if(priceEl) priceEl.textContent = money(p.preco);

 const desc =
  p.desc?.trim?.() ||
  p.descricao?.trim?.() ||
  p.descricao_completa?.trim?.() ||
  p.descricaoCompleta?.trim?.() ||
  p.description?.trim?.() ||
  "";

const descEl = document.getElementById("pdpDesc");
if (descEl) {
  descEl.style.display = "none";
}

const descFullEl = document.getElementById("pdpDescFull");
if (descFullEl) {
  if (typeof window.gerarDescricaoMarketplace === "function") {
    descFullEl.innerHTML = window.gerarDescricaoMarketplace(p);
  } else {
    descFullEl.textContent = desc || "Descrição não disponível.";
  }
}

  const specsResumo = document.getElementById("pdpSpecsResumo");

if (specsResumo) {

  if (p.especificacoes) {

    const linhas = p.especificacoes
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    specsResumo.innerHTML = `
      <h3>Especificações</h3>

      ${linhas.map(linha => {

        const partes = linha.split(":");

        const chave = partes.shift();

        const valor = partes.join(":").trim();

        return `
          <div>
            <strong>${chave}</strong>
            <span>${valor}</span>
          </div>
        `;

      }).join("")}
    `;

  } else {

    specsResumo.innerHTML = `
      <h3>Especificações</h3>

      <div><strong>Categoria</strong><span>${p.categoria || "Produto"}</span></div>

      <div><strong>Disponibilidade</strong><span>Em estoque</span></div>

      <div><strong>Atendimento</strong><span>WhatsApp</span></div>
    `;
  }
}
  // ===== BOTÕES PDP =====
const btnAddCart = document.getElementById("btnAddCart");
if (btnAddCart) {
  btnAddCart.onclick = () => {
    const carrinho =
  QAStorage.obterCarrinho();

    carrinho.push({
      id: p.id,
      nome: p.nome,
      preco: p.preco,
      imagem: p.images?.[0] || ""
    });

    QAStorage.salvarCarrinho(carrinho);

    if (typeof atualizarContadorCarrinho === "function") {
      atualizarContadorCarrinho();
    }

    mostrarToastCarrinho();
  };
}

const btnWhats = document.getElementById("btnWhats");
if (btnWhats) {
  const mensagem = encodeURIComponent(
    `Olá! Tenho interesse no produto: ${p.nome} - U$ ${Number(p.preco).toFixed(2)}`
  );

  btnWhats.href = `https://wa.me/595987374159?text=${mensagem}`;
}
  const imgs = Array.isArray(p.images) ? p.images : [];
  const hero = document.getElementById("pdpHeroImg");
  if(hero){
    hero.src = imgs[0] || "";
    hero.alt = nome;
  }

 ["g1","g2","g3"].forEach((gid, i)=>{
  const el = document.getElementById(gid);

  if(!el) return;

  if(imgs[i]){

    el.src = imgs[i];
    el.alt = nome;

  }else{

    el.remove();

  }

});

 const thumbs = document.getElementById("pdpThumbs");

if (thumbs) {
  thumbs.innerHTML = "";

  imgs.forEach((src, i) => {
    const btn = document.createElement("button");
    btn.className = i === 0 ? "pdp-thumb active" : "pdp-thumb";
    btn.type = "button";

    btn.innerHTML = `
      <img src="${src}" alt="${nome}">
    `;

    btn.onclick = () => {
      const hero2 = document.getElementById("pdpHeroImg");
      if (hero2) hero2.src = src;

      document.querySelectorAll(".pdp-thumb")
        .forEach(t => t.classList.remove("active"));

      btn.classList.add("active");
    };

    thumbs.appendChild(btn);
  });
}

  const relacionadosBox = document.getElementById("relacionados");

if (relacionadosBox && Array.isArray(window.produtos)) {
  const categoriaAtual = String(p.categoria || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let relacionados = window.produtos
    .filter(item => {
      if (!item) return false;

      const mesmoProduto = String(item.id) === String(p.id);

      const categoriaItem = String(item.categoria || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return !mesmoProduto && categoriaItem === categoriaAtual;
    })
    .slice(0, 8);

  // Se não encontrar pela categoria, mostra outros produtos da loja
  if (relacionados.length === 0) {
    relacionados = window.produtos
      .filter(item => String(item.id) !== String(p.id))
      .slice(0, 8);
  }

  relacionadosBox.innerHTML = "";

  relacionados.forEach(item => {
    const img =
      item.images?.[0] ||
      item.imagem ||
      item.image ||
      "img/placeholder.jpg";

    const link =
      typeof gerarLinkProduto === "function"
        ? gerarLinkProduto(item)
        : `produto.html?id=${item.id}`;

    relacionadosBox.innerHTML += `
      <a href="${link}" class="pdp-rel-inner">
        <img src="${img}" alt="${item.nome}">

        <h4>${item.nome}</h4>

        <p>${money(item.preco)}</p>
      </a>
    `;
  });
}
  // garante que meta fica escondido mesmo se o HTML renderizar depois
  hideLoadingAndMeta();

  setupReveal();
}

document.addEventListener("DOMContentLoaded", ()=>{
  setupReveal();
  loadProduct().catch(console.error);
});
  
function salvarProdutoVisto(produto) {
  if (!produto || produto.id == null) {
    return;
  }

  const vistos =
    QAStorage.obterProdutosVistos();

  const produtoVisto = {
    id: produto.id,
    nome: produto.nome || "Produto",
    preco: Number(produto.preco || 0),

    imagem:
      produto.imagem ||
      produto.image ||
      produto.images?.[0] ||
      "img/placeholder.jpg",

    url:
      `produto.html?id=${produto.id}`
  };

  const novaLista = [
    produtoVisto,

    ...vistos.filter(item => {
      return (
        String(item.id) !==
        String(produto.id)
      );
    })
  ].slice(0, 12);

  QAStorage.salvarProdutosVistos(
    novaLista
  );
}
function mostrarToastCarrinho() {
  const toast = document.getElementById("toastCarrinho");

  if (!toast) {
    mostrarToastCarrinho();
    return;
  }

  toast.classList.add("ativo");

  clearTimeout(window.toastCarrinhoTimer);

  window.toastCarrinhoTimer = setTimeout(() => {
    toast.classList.remove("ativo");
  }, 3500);
}
