// =====================================
// CONEXÃO COM O SUPABASE
// =====================================

const SUPABASE_URL =
  "https://queen-anne-site-guwu.vercel.app/"

const SUPABASE_ANON_KEY =
 sb_publishable_1U9sMtJKl324Gn9N0fEuBw_94y8egTY

// Cria a conexão com o Supabase
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Torna o cliente acessível aos outros arquivos
window.supabaseClient = supabaseClient;

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

  return data;
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
