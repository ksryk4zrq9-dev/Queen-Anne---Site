function obterClienteLogado() {
  try {
    return JSON.parse(
      localStorage.getItem("qa_cliente_logado")
    ) || null;
  } catch (erro) {
    console.error("Erro ao ler cliente logado:", erro);
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
}

function obterChaveCarrinho() {
  const cliente = obterClienteLogado();

  const email = String(cliente?.email || "")
    .trim()
    .toLowerCase();

  return email
    ? `qa_carrinho_${email}`
    : "qa_carrinho_visitante";
}
document.addEventListener("DOMContentLoaded", () => {
  iniciarAreaCliente();
  ativarMascaraTelefoneCliente();
});

async function iniciarAreaCliente() {
  const formLogin = document.getElementById("formLogin");
  const formCadastro = document.getElementById("formCadastro");

  if (formLogin) {
    formLogin.addEventListener("submit", entrarCliente);
  }

  if (formCadastro) {
    formCadastro.addEventListener("submit", cadastrarCliente);
  }

  if (window.location.pathname.includes("meus-pedidos.html")) {
    let clienteLogado = obterClienteLogado();

    if (!clienteLogado && window.supabaseClient) {
      const {
        data: { session }
      } = await window.supabaseClient.auth.getSession();

      if (session?.user) {
        const usuario = session.user;

        clienteLogado = {
          id: usuario.id,
          email: usuario.email,
          nome: usuario.user_metadata?.nome || "",
          telefone: usuario.user_metadata?.telefone || "",
          newsletter: usuario.user_metadata?.newsletter || false
        };

        localStorage.setItem(
          "qa_cliente_logado",
          JSON.stringify(clienteLogado)
        );
      }
    }

    if (!clienteLogado) {
      window.location.href = "entrar.html";
      return;
    }
  }

  carregarDadosClienteNaTela();
}
async function cadastrarCliente(event) {
  event.preventDefault();

  const nome = document
    .getElementById("cadNome")
    .value
    .trim();

  const email = document
    .getElementById("cadEmail")
    .value
    .trim()
    .toLowerCase();

  const telefone = document
    .getElementById("cadTelefone")
    .value
    .trim();

  const senha =
    document.getElementById("cadSenha").value;

  const confirmar =
    document.getElementById("cadConfirmar").value;

  const newsletter =
    document.getElementById("cadNewsletter").checked;

  if (!nome || !email || !senha || !confirmar) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  if (senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  if (senha !== confirmar) {
    alert("As senhas não conferem.");
    return;
  }

  if (!window.supabaseClient) {
    alert("A conexão com o Supabase não foi carregada.");
    return;
  }

  try {
    const { data, error } =
      await window.supabaseClient.auth.signUp({
        email,
        password: senha,
        options: {
  emailRedirectTo: `${window.location.origin}/meus-pedidos.html`,
  data: {
    nome,
    telefone,
    newsletter
  }
}
      });

    if (error) {
      console.error("Erro ao cadastrar:", error);

      if (
        error.message
          .toLowerCase()
          .includes("already registered")
      ) {
        alert("Este e-mail já possui cadastro.");
        return;
      }

      alert(
        "Erro ao criar a conta: " +
        error.message
      );

      return;
    }

    console.log("Cadastro realizado:", data);

    if (data.session && data.user) {
      const clienteLogado = {
        id: data.user.id,
        email: data.user.email,
        nome:
          data.user.user_metadata?.nome ||
          nome,
        telefone:
          data.user.user_metadata?.telefone ||
          telefone,
        newsletter
      };

      localStorage.setItem(
        "qa_cliente_logado",
        JSON.stringify(clienteLogado)
      );

      alert("Conta criada com sucesso!");

      window.location.href =
        "meus-pedidos.html";
    } else {
      alert(
        "Conta criada. Verifique seu e-mail para confirmar o cadastro."
      );

      document
        .getElementById("formCadastro")
        .reset();
    }
  } catch (erro) {
    console.error(
      "Falha inesperada no cadastro:",
      erro
    );

    alert(
      "Não foi possível conectar ao cadastro."
    );
  }
}

async function entrarCliente(event) {
  event.preventDefault();

  const email = document
    .getElementById("loginEmail")
    .value
    .trim()
    .toLowerCase();

  const senha =
    document.getElementById("loginSenha").value;

  if (!email || !senha) {
    alert("Digite seu e-mail e senha.");
    return;
  }

  if (!window.supabaseClient) {
    alert("A conexão com o Supabase não foi carregada.");
    return;
  }

  try {
    const { data, error } =
      await window.supabaseClient.auth
        .signInWithPassword({
          email,
          password: senha
        });

    if (error) {
      console.error("Erro ao entrar:", error);

      const mensagem =
        error.message.toLowerCase();

      if (
        mensagem.includes(
          "invalid login credentials"
        )
      ) {
        alert("E-mail ou senha incorretos.");
        return;
      }

      if (
        mensagem.includes(
          "email not confirmed"
        )
      ) {
        alert(
          "Confirme seu e-mail antes de entrar."
        );
        return;
      }

      alert(
        "Erro ao entrar: " +
        error.message
      );

      return;
    }

    if (!data.user) {
      alert("Não foi possível identificar sua conta.");
      return;
    }

    const clienteLogado = {
      id: data.user.id,
      email: data.user.email,
      nome:
        data.user.user_metadata?.nome ||
        data.user.email,
      telefone:
        data.user.user_metadata?.telefone ||
        "",
      newsletter:
        !!data.user.user_metadata?.newsletter
    };

    localStorage.setItem(
      "qa_cliente_logado",
      JSON.stringify(clienteLogado)
    );

    migrarDadosVisitanteParaCliente();

    window.location.href =
      "meus-pedidos.html";

  } catch (erro) {
    console.error(
      "Falha inesperada no login:",
      erro
    );

    alert(
      "Não foi possível conectar ao login."
    );
  }
}
function migrarDadosVisitanteParaCliente() {
  const cliente = QAStorage.obterClienteLogado();

  if (!cliente?.email) {
    return;
  }

  migrarCarrinhoVisitante();
  migrarProdutosVistosVisitante();
}

function migrarCarrinhoVisitante() {
  const chaveVisitante =
    "qa_carrinho_visitante";

  const chaveCliente =
    QAStorage.obterChaveCarrinho();

  if (chaveVisitante === chaveCliente) {
    return;
  }

  const carrinhoVisitante =
    QAStorage.lerJSON(chaveVisitante, []);

  const carrinhoCliente =
    QAStorage.lerJSON(chaveCliente, []);

  if (!carrinhoVisitante.length) {
    return;
  }

  const carrinhoUnificado = [
    ...carrinhoCliente,
    ...carrinhoVisitante
  ];

  QAStorage.salvarJSON(
    chaveCliente,
    carrinhoUnificado
  );

  localStorage.removeItem(chaveVisitante);
}

function migrarProdutosVistosVisitante() {
  const chaveVisitante =
    "qa_produtos_vistos_visitante";

  const chaveCliente =
    QAStorage.obterChaveProdutosVistos();

  if (chaveVisitante === chaveCliente) {
    return;
  }

  const vistosVisitante =
    QAStorage.lerJSON(chaveVisitante, []);

  const vistosCliente =
    QAStorage.lerJSON(chaveCliente, []);

  if (!vistosVisitante.length) {
    return;
  }

  const produtosUnificados = [
    ...vistosVisitante,
    ...vistosCliente
  ].filter((produto, indice, lista) => {
    return (
      lista.findIndex(item => {
        return String(item.id) ===
          String(produto.id);
      }) === indice
    );
  });

  QAStorage.salvarJSON(
    chaveCliente,
    produtosUnificados.slice(0, 12)
  );

  localStorage.removeItem(chaveVisitante);
}

function carregarProdutosVistosCliente() {
  const lista = document.getElementById("listaFavoritosCliente");
  const vazio = document.getElementById("favoritosVazio");

  if (!lista) return;

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

  const chaveProdutosVistos = email
    ? `qa_produtos_vistos_${email}`
    : "qa_produtos_vistos_visitante";

  let produtosVistos = [];

  try {
    produtosVistos =
      JSON.parse(localStorage.getItem(chaveProdutosVistos)) || [];
  } catch (erro) {
    console.error("Erro ao carregar produtos vistos:", erro);
    produtosVistos = [];
  }

  if (produtosVistos.length === 0) {
    lista.innerHTML = "";

    if (vazio) {
      vazio.style.display = "flex";
    }

    return;
  }

  if (vazio) {
    vazio.style.display = "none";
  }

  lista.innerHTML = produtosVistos.map(produto => {
    const imagem =
      produto.imagem ||
      produto.image ||
      produto.images?.[0] ||
      "img/placeholder.jpg";

    const link =
      produto.url ||
      `produto.html?id=${produto.id}`;

    const preco = Number(produto.preco || 0).toFixed(2);

    return `
      <article class="cliente-favorito-card">

        <a href="${link}" class="cliente-favorito-img">
          <img
            src="${imagem}"
            alt="${produto.nome || "Produto Queen Anne"}"
          >
        </a>

        <div class="cliente-favorito-info">

          <h3>
            ${produto.nome || "Produto"}
          </h3>

          <p class="cliente-favorito-preco">
            U$ ${preco}
          </p>

          <a href="${link}" class="cliente-favorito-btn">
            Ver produto
          </a>

        </div>

      </article>
    `;
  }).join("");
}
function carregarDadosClienteNaTela() {
  const cliente = obterClienteLogado();

  const estaNaAreaCliente =
    document.getElementById("clienteNomeTela") ||
    document.getElementById("clienteNomeLista") ||
    document.getElementById("clienteEmailLista");

  if (!estaNaAreaCliente) return;

  if (!cliente) {
    window.location.href = "entrar.html";
    return;
  }

  const nome = cliente.nome || "Cliente";
  const email = cliente.email || "E-mail não informado";
  const telefone = cliente.telefone || "Telefone não informado";

  preencherTexto("clienteNomeTela", nome);
  preencherTexto("clienteNomeLista", nome);
  preencherTexto("clienteEmailLista", email);
  preencherTexto("clienteTelefoneLista", telefone);
  preencherTexto("clienteEmailDados", email);
  preencherTexto("clienteTelefoneDados", telefone);

  const anoCliente = document.querySelector(
    ".cliente-since-badge strong"
  );

  if (anoCliente) {
    let ano = new Date().getFullYear();

    if (cliente.criadoEm) {
      const dataCriacao = new Date(cliente.criadoEm);

      if (!Number.isNaN(dataCriacao.getTime())) {
        ano = dataCriacao.getFullYear();
      }
    }

    anoCliente.textContent = ano;
  }
}
function preencherTexto(id, valor) {
  const el = document.getElementById(id);

  if (el) {
    el.innerText = valor;
  }
}

async function sairCliente() {
  try {
    if (window.supabaseClient) {
      await window.supabaseClient.auth.signOut();
    }
  } catch (erro) {
    console.error("Erro ao sair do Supabase:", erro);
  }

  localStorage.removeItem("qa_cliente_logado");
  window.location.href = "entrar.html";
}
function toggleSenha(id) {
  const input = document.getElementById(id);

  if (!input) return;

  const botao = input.parentElement.querySelector("button");
  const icone = botao?.querySelector("i");

  if (input.type === "password") {
    input.type = "text";

    if (icone) {
      icone.classList.remove("fa-eye");
      icone.classList.add("fa-eye-slash");
    }
  } else {
    input.type = "password";

    if (icone) {
      icone.classList.remove("fa-eye-slash");
      icone.classList.add("fa-eye");
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  carregarFormularioMeusDados();
  ativarMascaraTelefoneCliente();
});

function carregarFormularioMeusDados() {
  const form = document.getElementById("formMeusDados");

  if (!form) return;

  const cliente = JSON.parse(localStorage.getItem("qa_cliente_logado"));

  if (!cliente) {
    window.location.href = "entrar.html";
    return;
  }

  preencherCampo("dadosNome", cliente.nome || "");
  preencherCampo("dadosEmail", cliente.email || "");
  preencherCampo("dadosTelefone", cliente.telefone || "");
  preencherCampo("dadosCpf", cliente.cpf || "");
  preencherCampo("dadosNascimento", cliente.nascimento || "");

  const newsletter = document.getElementById("dadosNewsletter");
  if (newsletter) {
    newsletter.checked = !!cliente.newsletter;
  }

  form.addEventListener("submit", salvarMeusDados);
}

function preencherCampo(id, valor) {
  const campo = document.getElementById(id);

  if (campo) {
    campo.value = valor;
  }
}

function salvarMeusDados(event) {
  event.preventDefault();

  const clienteAtual =
    QAStorage.obterClienteLogado();

  if (!clienteAtual) {
    alert("Você precisa entrar na conta novamente.");
    window.location.href = "entrar.html";
    return;
  }

  const emailAntigo =
    QAStorage.normalizarEmail(clienteAtual.email);

  const emailNovo =
    QAStorage.normalizarEmail(
      document.getElementById("dadosEmail").value
    );

  const clienteComMesmoEmail =
    QAStorage.buscarClientePorEmail(emailNovo);

  if (
    emailAntigo !== emailNovo &&
    clienteComMesmoEmail
  ) {
    alert("Já existe outra conta com este e-mail.");
    return;
  }

  const clienteAtualizado = {
    ...clienteAtual,

    nome: document
      .getElementById("dadosNome")
      .value
      .trim(),

    email: emailNovo,

    telefone: aplicarMascaraTelefone(
      document
        .getElementById("dadosTelefone")
        .value
        .trim()
    ),

    cpf: document
      .getElementById("dadosCpf")
      .value
      .trim(),

    nascimento:
      document.getElementById("dadosNascimento").value,

    newsletter:
      document.getElementById("dadosNewsletter").checked
  };

  const novaSenha =
    document.getElementById("dadosSenha").value.trim();

  if (novaSenha) {
    clienteAtualizado.senha = novaSenha;
  }

  if (
    emailAntigo &&
    emailNovo &&
    emailAntigo !== emailNovo
  ) {
    migrarDadosEntreEmails(
      emailAntigo,
      emailNovo
    );

    QAStorage.excluirClientePorEmail(
      emailAntigo
    );
  }

  const clienteSalvo =
    QAStorage.salvarCliente(clienteAtualizado);

  QAStorage.definirClienteLogado(
    clienteSalvo
  );

  alert("Dados atualizados com sucesso!");

  window.location.href = "meus-pedidos.html";
}
document.addEventListener(
  "DOMContentLoaded",
  carregarProdutosVistosCliente
);

function carregarFavoritosCliente() {
  const lista = document.getElementById("listaFavoritosCliente");
  const vazio = document.getElementById("favoritosVazio");

  if (!lista) return;

  let produtosVistos = [];

  try {
    produtosVistos = JSON.parse(
      localStorage.getItem(obterChaveProdutosVistos())
    ) || [];
  } catch (erro) {
    console.error("Erro ao carregar produtos vistos:", erro);
    produtosVistos = [];
  }

  if (!produtosVistos.length) {
    lista.innerHTML = "";

    if (vazio) {
      vazio.style.display = "flex";
    }

    return;
  }

  if (vazio) {
    vazio.style.display = "none";
  }

  lista.innerHTML = produtosVistos.map(produto => {
    const imagem =
      produto.imagem ||
      produto.image ||
      produto.images?.[0] ||
      "img/placeholder.jpg";

    const link =
      produto.url ||
      `produto.html?id=${produto.id}`;

    const preco = Number(produto.preco || 0).toFixed(2);

    return `
      <article class="cliente-favorito-card">
        <a href="${link}" class="cliente-favorito-img">
          <img
            src="${imagem}"
            alt="${produto.nome || "Produto Queen Anne"}"
          >
        </a>

        <div class="cliente-favorito-info">
          <h3>${produto.nome || "Produto"}</h3>

          <p class="cliente-favorito-preco">
            U$ ${preco}
          </p>

          <a href="${link}" class="cliente-favorito-btn">
            Ver produto
          </a>
        </div>
      </article>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", carregarFavoritosCliente);

function formatarPrecoCliente(preco) {
  const valor = Number(preco);

  if (Number.isNaN(valor)) {
    return preco || "Consulte";
  }

  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function removerProdutoVisto(id) {
  const produtos =
    QAStorage.obterProdutosVistos();

  const novaLista = produtos.filter(
    produto =>
      String(produto.id) !== String(id)
  );

  QAStorage.salvarProdutosVistos(
    novaLista
  );

  carregarProdutosVistosCliente();
  carregarFavoritosCliente();
}

function migrarDadosEntreEmails(
  emailAntigo,
  emailNovo
) {
  const prefixos = [
    "qa_carrinho",
    "qa_produtos_vistos",
    "qa_favoritos",
    "qa_pedidos"
  ];

  prefixos.forEach(prefixo => {
    const chaveAntiga =
      `${prefixo}_${emailAntigo}`;

    const chaveNova =
      `${prefixo}_${emailNovo}`;

    const dados =
      localStorage.getItem(chaveAntiga);

    if (dados !== null) {
      localStorage.setItem(
        chaveNova,
        dados
      );

      localStorage.removeItem(
        chaveAntiga
      );
    }
  });
}

function adicionarProdutoVistoAoCarrinho(id) {
  const produtos =
    QAStorage.obterProdutosVistos();

  const produto = produtos.find(
    item =>
      String(item.id) === String(id)
  );

  if (!produto) {
    alert("Produto não encontrado.");
    return;
  }

  const carrinho =
    QAStorage.obterCarrinho();

  carrinho.push({
    id: produto.id,
    nome: produto.nome,
    preco: Number(produto.preco || 0),

    imagem:
      produto.imagem ||
      produto.image ||
      produto.images?.[0] ||
      "img/placeholder.jpg"
  });

  QAStorage.salvarCarrinho(carrinho);

  alert("Produto adicionado ao carrinho!");
}

function aplicarMascaraTelefone(valor) {
  let numeros = String(valor || "").replace(/\D/g, "");

  if (numeros.length > 11) {
    numeros = numeros.slice(0, 11);
  }

  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 7) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}
function ativarMascaraTelefoneCliente() {
  const camposTelefone = [
    document.getElementById("cadTelefone"),
    document.getElementById("dadosTelefone")
  ];

  camposTelefone.forEach(campo => {
    if (!campo) return;

    campo.value = aplicarMascaraTelefone(campo.value);

    campo.addEventListener("input", () => {
      campo.value = aplicarMascaraTelefone(campo.value);
    });
  });
}
