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
