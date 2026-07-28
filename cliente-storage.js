(function () {
  const CHAVE_CLIENTES = "qa_clientes";
  const CHAVE_CLIENTE_LOGADO = "qa_cliente_logado";

  function normalizarEmail(email) {
    return String(email || "")
      .trim()
      .toLowerCase();
  }

  function lerJSON(chave, valorPadrao = null) {
    try {
      const conteudo = localStorage.getItem(chave);

      if (!conteudo) {
        return valorPadrao;
      }

      return JSON.parse(conteudo);
    } catch (erro) {
      console.error("Erro ao ler a chave:", chave, erro);
      return valorPadrao;
    }
  }

  function salvarJSON(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  function obterClienteLogado() {
    return lerJSON(CHAVE_CLIENTE_LOGADO, null);
  }

  function definirClienteLogado(cliente) {
    if (!cliente) {
      localStorage.removeItem(CHAVE_CLIENTE_LOGADO);
      return;
    }

    salvarJSON(CHAVE_CLIENTE_LOGADO, cliente);
  }

  function obterEmailClienteLogado() {
    const cliente = obterClienteLogado();

    return normalizarEmail(cliente?.email);
  }

  function obterChaveCarrinho() {
    const email = obterEmailClienteLogado();

    return email
      ? `qa_carrinho_${email}`
      : "qa_carrinho_visitante";
  }

  function obterChaveProdutosVistos() {
    const email = obterEmailClienteLogado();

    return email
      ? `qa_produtos_vistos_${email}`
      : "qa_produtos_vistos_visitante";
  }

  function obterChaveFavoritos() {
    const email = obterEmailClienteLogado();

    return email
      ? `qa_favoritos_${email}`
      : "qa_favoritos_visitante";
  }

  function obterChavePedidos() {
    const email = obterEmailClienteLogado();

    return email
      ? `qa_pedidos_${email}`
      : "qa_pedidos_visitante";
  }

  function obterCarrinho() {
    return lerJSON(obterChaveCarrinho(), []);
  }

  function salvarCarrinho(carrinho) {
    const lista = Array.isArray(carrinho)
      ? carrinho
      : [];

    salvarJSON(obterChaveCarrinho(), lista);

    window.dispatchEvent(
      new CustomEvent("qa:carrinho-atualizado")
    );
  }

  function obterProdutosVistos() {
    return lerJSON(obterChaveProdutosVistos(), []);
  }

  function salvarProdutosVistos(produtos) {
    const lista = Array.isArray(produtos)
      ? produtos
      : [];

    salvarJSON(obterChaveProdutosVistos(), lista);
  }

  function obterClientes() {
    return lerJSON(CHAVE_CLIENTES, {});
  }

  function buscarClientePorEmail(email) {
    const emailNormalizado = normalizarEmail(email);
    const clientes = obterClientes();

    return clientes[emailNormalizado] || null;
  }

  function salvarCliente(cliente) {
    const email = normalizarEmail(cliente?.email);

    if (!email) {
      throw new Error("E-mail do cliente não informado.");
    }

    const clientes = obterClientes();

    clientes[email] = {
      ...cliente,
      email
    };

    salvarJSON(CHAVE_CLIENTES, clientes);

    return clientes[email];
  }

  function excluirClientePorEmail(email) {
    const emailNormalizado = normalizarEmail(email);
    const clientes = obterClientes();

    delete clientes[emailNormalizado];

    salvarJSON(CHAVE_CLIENTES, clientes);
  }

  window.QAStorage = {
    normalizarEmail,
    lerJSON,
    salvarJSON,
    obterClienteLogado,
    definirClienteLogado,
    obterEmailClienteLogado,
    obterChaveCarrinho,
    obterChaveProdutosVistos,
    obterChaveFavoritos,
    obterChavePedidos,
    obterCarrinho,
    salvarCarrinho,
    obterProdutosVistos,
    salvarProdutosVistos,
    obterClientes,
    buscarClientePorEmail,
    salvarCliente,
    excluirClientePorEmail
  };

  // Compatibilidade com funções que já existem no site.
  window.obterClienteLogado = obterClienteLogado;
  window.obterChaveCarrinho = obterChaveCarrinho;
  window.obterChaveProdutosVistos =
    obterChaveProdutosVistos;
})();
