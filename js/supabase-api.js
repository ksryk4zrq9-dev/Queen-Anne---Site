// CONEXÃO COM O SUPABASE

const SUPABASE_URL =
  "https://elcqvwnsoucbhuqhwify.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_vBIYdnKpF1lTw-g5gP4gsw_lhyQGUBP";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

window.supabaseClient = supabaseClient;

console.log("Supabase carregado com sucesso.");

// =====================================
// BUSCAR TODOS OS PRODUTOS ATIVOS
// =====================================

async function getProdutos() {
  const { data, error } = await supabaseClient
    .from("produtos")
    .select(`
      id,
      atualizado_em,
      nome,
      preco,
      categoria,
      imagem,
      descricao,
      ativo,
      estoque
    `)
    .eq("ativo", true)
    .order("id", { ascending: true });

  if (error) {
    console.error(
      "Erro ao buscar produtos no Supabase:",
      error
    );

    throw error;
  }

  console.log(
    `${data.length} produtos recebidos do Supabase.`
  );

  return data || [];
}

window.getProdutos = getProdutos;

// =====================================
// BUSCAR UM PRODUTO PELO ID
// =====================================

async function getProdutoPorId(id) {
  const { data, error } = await supabaseClient
    .from("produtos")
    .select(`
      id,
      atualizado_em,
      nome,
      preco,
      categoria,
      imagem,
      descricao,
      ativo,
      estoque
    `)
    .eq("id", id)
    .eq("ativo", true)
    .maybeSingle();

  if (error) {
    console.error(
      "Erro ao buscar produto:",
      error
    );

    throw error;
  }

  return data;
}

window.getProdutoPorId = getProdutoPorId;

// =====================================
// NOVO CATÁLOGO COM PAGINAÇÃO E VARIAÇÕES
// As funções antigas acima continuam ativas para a home e para os produtos já cadastrados.
// =====================================

async function getCatalogoPagina(opcoes = {}) {
  const pagina = Math.max(1, Number(opcoes.pagina) || 1);
  const limite = Math.min(48, Math.max(1, Number(opcoes.limite) || 24));
  const inicio = (pagina - 1) * limite;
  const fim = inicio + limite - 1;
  const categoria = String(opcoes.categoria || "Todos").trim();
  const busca = String(opcoes.busca || "").trim();
  const ordem = String(opcoes.ordem || "relevancia");

  let query = supabaseClient
    .from("catalogo_produtos")
    .select("produto_chave,nome,marca,categoria,subcategoria,descricao,imagem,preco_min,preco_max,quantidade_variacoes", { count: "exact" })
    .eq("ativo", true);

  if (categoria && categoria.toLowerCase() !== "todos") {
    query = query.eq("categoria", categoria);
  }

  if (busca) {
    const termoSeguro = busca.replace(/[,%()]/g, " ").trim();
    if (termoSeguro) {
      query = query.or(`nome.ilike.%${termoSeguro}%,descricao.ilike.%${termoSeguro}%,marca.ilike.%${termoSeguro}%`);
    }
  }

  if (ordem === "menor-preco") query = query.order("preco_min", { ascending: true });
  else if (ordem === "maior-preco") query = query.order("preco_min", { ascending: false });
  else if (ordem === "nome") query = query.order("nome", { ascending: true });
  else query = query.order("nome", { ascending: true });

  const { data, error, count } = await query.range(inicio, fim);

  if (error) throw error;

  return {
    produtos: data || [],
    total: Number(count) || 0,
    pagina,
    limite,
    totalPaginas: Math.max(1, Math.ceil((Number(count) || 0) / limite))
  };
}

async function getCatalogoProduto(produtoChave) {
  const { data: produto, error: erroProduto } = await supabaseClient
    .from("catalogo_produtos")
    .select("produto_chave,nome,marca,categoria,subcategoria,descricao,descricao_longa,destaques,especificacoes,imagem,preco_min,preco_max,quantidade_variacoes")
    .eq("produto_chave", produtoChave)
    .eq("ativo", true)
    .maybeSingle();

  if (erroProduto) throw erroProduto;
  if (!produto) return null;

  const { data: variantes, error: erroVariantes } = await supabaseClient
    .from("catalogo_variantes")
    .select("numero_cadastro,nome,descricao,cor,tamanho,memoria,capacidade,modelo,imagem,preco,estoque")
    .eq("produto_chave", produtoChave)
    .eq("ativo", true)
    .gt("estoque", 0)
    .order("preco", { ascending: true });

  if (erroVariantes) throw erroVariantes;

  return { ...produto, variantes: variantes || [] };
}

async function buscarCatalogo(termo, limite = 8) {
  const resultado = await getCatalogoPagina({ busca: termo, limite, pagina: 1, ordem: "nome" });
  return resultado.produtos;
}

window.getCatalogoPagina = getCatalogoPagina;
window.getCatalogoProduto = getCatalogoProduto;
window.buscarCatalogo = buscarCatalogo;
