const EVENTOS_PERMITIDOS = new Set([
  "pagina_visualizada",
  "pesquisa_realizada",
  "resultado_pesquisa_clicado",
  "produto_visualizado",
  "carrinho_adicionado",
  "whatsapp_clicado"
]);

function limitar(valor, maximo) {
  return String(valor || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maximo);
}

function cabecalho(req, nome) {
  const valor = req.headers[nome];
  return Array.isArray(valor) ? valor[0] : valor || "";
}

function decodificarGeo(valor) {
  try {
    return decodeURIComponent(valor || "");
  } catch (_) {
    return valor || "";
  }
}

function dispositivo(userAgent) {
  if (/bot|crawler|spider|slurp/i.test(userAgent)) return "robô";
  if (/tablet|ipad/i.test(userAgent)) return "tablet";
  if (/mobile|android|iphone/i.test(userAgent)) return "celular";
  return "computador";
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  const tamanho = Number(cabecalho(req, "content-length"));
  if (Number.isFinite(tamanho) && tamanho > 4096) {
    return res.status(413).json({ ok: false });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error("Variáveis do analytics não configuradas.");
    return res.status(503).json({ ok: false });
  }

  let body = req.body;

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (_) {
      return res.status(400).json({ ok: false });
    }
  }

  if (!body || typeof body !== "object") {
    return res.status(400).json({ ok: false });
  }

  const evento = limitar(body.evento, 50);

  if (!EVENTOS_PERMITIDOS.has(evento)) {
    return res.status(400).json({ ok: false });
  }

  const userAgent = limitar(cabecalho(req, "user-agent"), 400);
  if (/bot|crawler|spider|slurp/i.test(userAgent)) {
    return res.status(204).end();
  }
  let origem = "";

  try {
    origem = new URL(cabecalho(req, "referer")).origin;
  } catch (_) {
    origem = "acesso direto";
  }

  const registro = {
    evento,
    pagina: limitar(body.pagina, 120),
    caminho: limitar(body.caminho, 240),
    termo_pesquisado: limitar(body.termo_pesquisado, 180) || null,
    total_resultados: Number.isFinite(Number(body.total_resultados))
      ? Math.max(0, Math.min(Number(body.total_resultados), 100000))
      : null,
    codigo_produto: limitar(body.codigo_produto, 100) || null,
    nome_produto: limitar(body.nome_produto, 240) || null,
    origem_clique: limitar(body.origem_clique, 100) || null,
    cidade: limitar(decodificarGeo(cabecalho(req, "x-vercel-ip-city")), 120) || null,
    regiao: limitar(cabecalho(req, "x-vercel-ip-country-region"), 80) || null,
    pais: limitar(cabecalho(req, "x-vercel-ip-country"), 2) || null,
    dispositivo: dispositivo(userAgent),
    origem
  };

  try {
    const headersSupabase = {
      apikey: serviceKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    };

    // Chaves service_role antigas são JWT; as novas chaves secretas usam apikey.
    if (serviceKey.split(".").length === 3) {
      headersSupabase.Authorization = `Bearer ${serviceKey}`;
    }

    const resposta = await fetch(`${supabaseUrl}/rest/v1/eventos_site`, {
      method: "POST",
      headers: headersSupabase,
      body: JSON.stringify(registro)
    });

    if (!resposta.ok) {
      console.error("Falha ao registrar evento:", resposta.status);
      return res.status(502).json({ ok: false });
    }

    return res.status(204).end();
  } catch (erro) {
    console.error("Falha no analytics:", erro);
    return res.status(500).json({ ok: false });
  }
}
