// ===== PRODUTOS (Supabase primeiro, fallback local) =====
const produtosFallback = [
  {
    id: 1,
    nome: "PlayStation 5 (PS5)Slim 1TB",
    preco: 497.90,
    categoria: "Consoles",
    images: ["img/imgps5.jpg"],

    desc: "O PlayStation 5 Slim 1TB entrega uma experiência de nova geração com design mais compacto, armazenamento interno de 1TB e carregamentos ultrarrápidos por SSD. É ideal para quem busca jogos com gráficos avançados, suporte a 4K, HDR, Ray Tracing, áudio 3D e comandos mais imersivos com o controle DualSense.",

    especificacoes: `
Marca: Sony PlayStation
Modelo: PlayStation 5 (PS5) Slim
Armazenamento: 1TB SSD
Resolução: suporte a jogos em 4K
Recursos: Ray Tracing, HDR, até 120fps com saída 120Hz, áudio 3D
Controle: DualSense sem fio
`
},
  {
  id: 2,
  nome: "TV LED Samsung 32 Smart",
  preco: 119.90,
  categoria: "TVs",
  images: ["img/tv-samsung-32.jpg"],
  desc: "A Smart TV Samsung 32 é indicada para quem busca uma televisão compacta, moderna e prática para quartos, salas menores, cozinhas ou ambientes secundários. Modelos Samsung de 32 polegadas podem oferecer resolução HD ou Full HD, recursos Smart TV, acesso a canais e aplicativos, HDR em linhas recentes e sistema voltado para uso simples no dia a dia.",
  especificacoes: `
  Marca: Samsung
  Tamanho da tela: 32 polegadas
  Tipo: Smart TV LED
  Resolução: HD / Full HD conforme modelo
  Recursos: Aplicativos de streaming, canais digitais e conectividade Smart
  `
 },
  {
    id: 4,
    nome: "Ar Gree 24000 BTU",
  preco: 599.00,
  categoria: "Eletrodomésticos",
  images: ["img/ar-gree-24000.jpg"],
  desc: "O Ar-Condicionado Gree 24000 BTU é indicado para quem busca alta capacidade de climatização em ambientes amplos. Reconhecida mundialmente pela qualidade e eficiência energética, a Gree oferece equipamentos com excelente desempenho, baixo nível de ruído e recursos que proporcionam mais conforto no dia a dia. Ideal para residências, escritórios e espaços comerciais.",
  especificacoes: `
  Marca: Gree
  Capacidade: 24000 BTU
  Tipo: Split Hi-Wall
  Funções: Refrigeração, ventilação e desumidificação
  Recursos: Controle remoto, timer e múltiplos modos de operação
  Aplicação: Ambientes médios e grandes
  `
  },
  {
    id: 5,
    nome: "Ar Smartfy 12000 BTU",
  preco: 234.99,
  categoria: "Eletrodomésticos",
  images: ["img/ar-smartfy-12000.jpg"],
  desc: "O Ar-Condicionado Smartfy 12000 BTU é uma excelente opção para quem deseja conforto térmico aliado à praticidade. Com climatização eficiente e funcionamento silencioso, é ideal para quartos, salas e escritórios de pequeno e médio porte. Seu design moderno combina com diversos ambientes e proporciona uma experiência agradável em qualquer estação do ano.",
  especificacoes: `
  Marca: Smartfy
  Capacidade: 12000 BTU
  Tipo: Split
  Funções: Refrigeração, ventilação e desumidificação
  Controle: Remoto
  Recursos: Timer, ajuste de temperatura e modos de operação
  Aplicação: Ambientes pequenos e médios
  `
  },
  {
  id: 6,
  nome: "TV LED 32” Marson MAS32 Smart Android",
  preco: 79.99,
  categoria: "TVs",
  images: ["img/tv-32-marson.jpg"],
  desc: "A TV LED 32” Marson MAS32 Smart Android é uma opção prática e funcional para quem busca entretenimento com conectividade no dia a dia. Com tela LED de 32 polegadas e sistema Smart Android, permite acessar aplicativos, vídeos, filmes, séries e conteúdos online com facilidade. Seu tamanho compacto é ideal para quartos, salas menores, escritórios e ambientes onde uma TV moderna e versátil faz toda a diferença.",
  especificacoes: `
  Marca: Marson
  Modelo: MAS32
  Tamanho da tela: 32 polegadas
  Tecnologia: LED
  Sistema: Smart Android
  Conectividade: Acesso a aplicativos e conteúdos online
  Recursos: Reprodução de vídeos, filmes, séries e plataformas digitais
  Aplicação: Quartos, salas menores, escritórios e ambientes compactos
  `
},
  {
    id: 7,
    nome: "Panela de Arroz Smartfy",
  preco: 17.50,
  categoria: "Eletrodomésticos",
  images: ["img/panela-arroz.jpg"],
  desc: "A Panela de Arroz Smartfy é indicada para quem busca praticidade e eficiência no preparo das refeições. Com funcionamento automático, ela cozinha o arroz de forma uniforme e mantém os alimentos aquecidos após o preparo. Seu recipiente antiaderente facilita a limpeza e torna o dia a dia muito mais simples.",
  especificacoes: `
  Marca: Smartfy
  Tipo: Panela Elétrica de Arroz
  Capacidade: Conforme modelo
  Revestimento: Antiaderente
  Funções: Cozinhar e manter aquecido
  Recursos: Tampa com saída de vapor e indicador luminoso
  `
  },
  {
    id: 8,
    nome: "Perfume Intrude EDP",
  preco: 13.99,
  categoria: "Perfumes",
  images: ["img/intrude.jpg"],
  desc: "O Perfume Intrude Eau de Parfum é indicado para mulheres que buscam uma fragrância elegante e marcante para diversas ocasiões. Sua composição combina notas florais e frutadas que proporcionam frescor, feminilidade e sofisticação. Ideal para quem deseja deixar uma impressão memorável por onde passa.",
  especificacoes: `
  Tipo: Eau de Parfum
  Gênero: Feminino
  Família Olfativa: Floral Frutada
  Fixação: Longa duração
  Indicação: Uso diário e ocasiões especiais
  `
  },
  {
    id: 9,
    nome: "Perfume Mont Blanc Signature",
  preco: 38.50,
  categoria: "Perfumes",
  images: ["img/montblanc.jpg"],
  desc: "O Montblanc Signature Eau de Parfum é uma fragrância sofisticada criada para mulheres modernas que valorizam elegância e autenticidade. Com notas florais, orientais e levemente adocicadas, oferece uma experiência olfativa envolvente e refinada, perfeita para destacar sua personalidade em qualquer ocasião.",
  especificacoes: `
  Marca: Montblanc
  Linha: Signature
  Tipo: Eau de Parfum
  Gênero: Feminino
  Família Olfativa: Floral Oriental
  Fixação: Excelente duração e projeção
  `
  },
  {
    id: 10,
    nome: "Chave de Impacto Dewalt",
  preco: 249.99,
  categoria: "Ferramentas",
  images: ["img/dewalt.jpg"],
  desc: "A Chave de Impacto Dewalt é indicada para profissionais e usuários que necessitam de potência, resistência e praticidade em trabalhos de montagem e manutenção. Desenvolvida com materiais de alta qualidade, oferece desempenho confiável para aplicações em oficinas, construções e serviços diversos.",
  especificacoes: `
  Marca: Dewalt
  Tipo: Chave de Impacto
  Aplicação: Montagem e remoção de parafusos e porcas
  Recursos: Alto torque e estrutura resistente
  Alimentação: Conforme modelo
  Uso: Profissional e doméstico
  `
  },
  {
    id: 11,
     nome: "Amazon Fire TV Stick",
  preco: 20.00,
  categoria: "Eletrônicos",
  images: ["img/fire-tv.jpg"],
  desc: "O Amazon Fire TV Stick é indicado para quem deseja transformar qualquer TV compatível em uma Smart TV completa. Com acesso rápido aos principais aplicativos de streaming, oferece uma navegação intuitiva, excelente desempenho e praticidade para assistir filmes, séries, músicas e muito mais.",
  especificacoes: `
  Marca: Amazon
  Modelo: Fire TV Stick
  Conectividade: HDMI e Wi-Fi
  Recursos: Streaming de vídeo, música e aplicativos
  Compatibilidade: TVs com entrada HDMI
  Controle: Remoto incluso
  `

  },
  {
    id: 12,
    nome: "Robot Xiaomi X20",
  preco: 520.00,
  categoria: "Eletrônicos",
  images: ["img/robot-xiaomi.jpg"],
  desc: "O Aspirador Robô Xiaomi X20 é indicado para quem busca praticidade na limpeza diária da casa. Equipado com navegação inteligente e alta potência de sucção, ele mapeia os ambientes com precisão e realiza a limpeza de forma eficiente. Ideal para manter pisos limpos com o mínimo de esforço.",
  especificacoes: `
  Marca: Xiaomi
  Modelo: X20
  Tipo: Aspirador Robô Inteligente
  Funções: Aspirar e auxiliar na limpeza de pisos
  Navegação: Mapeamento inteligente
  Controle: Aplicativo e programação automática
  `
  },
  {
    id: 13,
    nome: "Xiaomi Poco M7",
  preco: 189.00,
  categoria: "Celulares",
  images: ["img/poco-m7.jpg"],
  desc: "O Xiaomi Poco M7 é indicado para quem busca desempenho, autonomia e uma experiência completa para o dia a dia. Equipado com tela ampla de alta definição, processador eficiente e bateria de longa duração, oferece excelente fluidez para redes sociais, vídeos, jogos e multitarefas. Seu conjunto de câmeras permite registrar fotos e vídeos com ótima qualidade, enquanto o sistema Xiaomi HyperOS proporciona uma navegação moderna, rápida e intuitiva. Um smartphone desenvolvido para quem deseja tecnologia avançada com excelente custo-benefício.",
  especificacoes: `
  Marca: Xiaomi
  Linha: POCO
  Modelo: M7
  Tela: 6,88 polegadas HD+
  Taxa de atualização: Até 120Hz
  Processador: Octa-Core
  Sistema Operacional: Xiaomi HyperOS
  Câmera Principal: 50MP
  Bateria: 5160mAh
  Recursos: Leitor digital, reconhecimento facial e conectividade avançada
  `
  },
  {
    id: 14,
      nome: "Samsung A36",
  preco: 279.00,
  categoria: "Celulares",
  images: ["img/samsung-a36.jpg"],
  desc: "O Samsung Galaxy A36 foi desenvolvido para oferecer uma experiência equilibrada entre desempenho, design e conectividade. Com tela ampla de alta qualidade, câmeras versáteis e bateria de longa duração, é ideal para quem utiliza redes sociais, aplicativos de produtividade, vídeos e jogos. Seu design moderno aliado à interface One UI proporciona praticidade e conforto durante o uso diário, tornando-o uma excelente opção para quem busca tecnologia confiável da Samsung.",
  especificacoes: `
  Marca: Samsung
  Modelo: Galaxy A36
  Tela: Super AMOLED de 6,7 polegadas
  Taxa de atualização: Até 120Hz
  Sistema Operacional: Android
  Câmeras: Conjunto traseiro múltiplo e câmera frontal para selfies
  Bateria: Longa duração
  Recursos: Leitor biométrico, NFC e conectividade 5G
  `
  },
  {
    id: 15,
    nome: "Ventilador Mondial",
  preco: 29.00,
  categoria: "Eletrodomésticos",
  images: ["img/ventilador-mondial.jpg"],
  desc: "O Ventilador Mondial 40cm é indicado para quem busca conforto e ventilação eficiente em qualquer ambiente. Com hélices de alto desempenho e diferentes níveis de velocidade, proporciona excelente circulação de ar para residências, escritórios e estabelecimentos comerciais. Seu design funcional permite direcionar o fluxo de vento de acordo com a necessidade, oferecendo mais praticidade e bem-estar durante os dias mais quentes.",
  especificacoes: `
  Marca: Mondial
  Diâmetro: 40 cm
  Tipo: Ventilador de mesa ou coluna conforme modelo
  Velocidades: Múltiplas opções de ajuste
  Recursos: Oscilação automática e inclinação regulável
  Aplicação: Ambientes residenciais e comerciais
  `
  },
  {
    id: 17,
    nome: "Soundbar JBL Bar 500",
  preco: 325.00,
  categoria: "Áudio",
  images: ["img/soundbar-jbl-bar-500.jpg"],
  desc: "A JBL Bar 500 é indicada para quem deseja transformar a experiência sonora da televisão em um verdadeiro cinema em casa. Equipada com tecnologia Dolby Atmos® e MultiBeam™, oferece som surround tridimensional sem a necessidade de caixas traseiras adicionais. Seus 590W de potência total proporcionam áudio envolvente para filmes, séries, esportes e jogos, enquanto o subwoofer sem fio de 10 polegadas entrega graves profundos e impactantes. Além disso, conta com Wi-Fi integrado, Chromecast Built-in™, AirPlay e Alexa Multi-Room Music, permitindo reproduzir músicas e conteúdos diretamente dos principais serviços de streaming. A tecnologia PureVoice melhora a clareza dos diálogos, garantindo que cada detalhe seja ouvido com precisão.",
  especificacoes: `
  Marca: JBL
  Modelo: Bar 500
  Potência Total: 590W
  Tecnologia: Dolby Atmos® e MultiBeam™
  Subwoofer: Sem fio de 10 polegadas
  Conectividade: Wi-Fi, Bluetooth, HDMI eARC e Chromecast Built-in
  Recursos: PureVoice, calibração automática de ambiente e streaming de música
  Aplicação: Filmes, séries, músicas e games
  `
  },
  {
    id: 18,
    nome: "Amazon Fire TV Stick HD (2024)",
  preco: 30.50,
  categoria: "Eletrônicos",
  images: ["img/fire-tv-2024.jpg"],
  desc: "O Amazon Fire TV Stick HD 2024 transforma qualquer televisão compatível em uma Smart TV completa. Com acesso rápido aos principais aplicativos de streaming, oferece uma experiência intuitiva para assistir filmes, séries, esportes e conteúdos online. Seu controle remoto com comando de voz facilita a navegação e a busca por conteúdos, enquanto o desempenho otimizado garante reprodução fluida e rápida instalação em qualquer ambiente.",
  especificacoes: `
  Marca: Amazon
  Modelo: Fire TV Stick HD 2024
  Resolução: Full HD
  Conectividade: Wi-Fi e HDMI
  Controle: Comando de voz Alexa incluso
  Recursos: Streaming de vídeo, música e aplicativos
  Compatibilidade: TVs com entrada HDMI
  `
  },
  {
    id: 19,
    nome: "Receptor IPTV BTV13 4K",
  preco: 148.90,
  categoria: "Eletrônicos",
  images: ["img/btv13.jpg"],
  desc: "O BTV13 4K é uma central multimídia desenvolvida para quem busca entretenimento completo em alta definição. Com suporte para resolução 4K, navegação fluida e interface intuitiva, proporciona acesso a conteúdos digitais, aplicativos e recursos multimídia em um único equipamento. Seu hardware avançado garante excelente desempenho para reprodução de vídeos e utilização de aplicativos diversos.",
  especificacoes: `
  Modelo: BTV13
  Resolução: Até 4K Ultra HD
  Sistema: Baseado em Android
  Conectividade: Wi-Fi e Ethernet
  Recursos: Reprodução multimídia e aplicativos
  Processamento: Alto desempenho para navegação e streaming
  `
  },
  {
    id: 20,
    nome: "Projetor Smartfy PJ01W",
  preco: 49.00,
  categoria: "Eletrônicos",
  images: ["img/projetor-smartfy.jpg"],
  desc: "O Projetor Smartfy PJ01W é ideal para quem deseja criar uma experiência de cinema em casa ou realizar apresentações de forma prática e eficiente. Compacto e fácil de transportar, permite projetar imagens, vídeos e apresentações em telas de grandes dimensões. Sua versatilidade o torna uma excelente opção tanto para entretenimento quanto para uso profissional e educacional.",
  especificacoes: `
  Marca: Smartfy
  Modelo: PJ01W
  Tipo: Projetor Multimídia
  Resolução: Compatível com conteúdos em alta definição
  Conectividade: Entradas multimídia diversas
  Aplicação: Filmes, séries, apresentações e jogos
  `
  },
  {
    id: 21,
    nome: "Tablet TCL 11\" 4GB/128GB",
  preco: 145.00,
  categoria: "Eletrônicos",
  images: ["img/tablet-tcl-11.jpg"],
  desc: "O Tablet TCL 11 oferece uma excelente combinação entre desempenho, armazenamento e conforto visual. Sua tela ampla de 11 polegadas proporciona ótima experiência para estudos, trabalho, leitura e entretenimento. Com 128GB de armazenamento interno e 4GB de memória RAM, permite executar aplicativos, assistir vídeos e navegar na internet com praticidade e fluidez.",
  especificacoes: `
  Marca: TCL
  Tela: 11 polegadas
  Memória RAM: 4GB
  Armazenamento: 128GB
  Sistema Operacional: Android
  Recursos: Wi-Fi, Bluetooth e câmeras integradas
  Aplicação: Estudos, trabalho e entretenimento
  `
  },
  {
    id: 22,
    nome: "Microfone Audisat X Vlog",
  preco: 18.00,
  categoria: "Eletrônicos",
  images: ["img/microfone-audisat.jpg"],
  desc: "O Microfone Audisat X Vlog foi desenvolvido para criadores de conteúdo, vloggers, streamers e profissionais que desejam melhorar a qualidade das gravações. Compacto e fácil de utilizar, proporciona captação clara da voz, reduzindo ruídos indesejados e garantindo maior qualidade para vídeos, transmissões ao vivo, entrevistas e apresentações.",
  especificacoes: `
  Marca: Audisat
  Modelo: X Vlog
  Tipo: Microfone para gravação
  Aplicação: Vlogs, lives, vídeos e entrevistas
  Recursos: Captação de voz com maior clareza
  Compatibilidade: Smartphones, câmeras e computadores
  `
  },
  {
    id: 23,
    nome: "Câmera Xiaomi Outdoor AW300",
  preco: 36.90,
  categoria: "Eletrônicos",
  images: ["img/xiaomi-aw300.jpg"],
  desc: "A Xiaomi Outdoor Camera AW300 foi desenvolvida para oferecer monitoramento inteligente e maior segurança para ambientes externos. Equipada com resolução Full HD, visão noturna colorida e resistência às condições climáticas, permite acompanhar sua residência ou empresa em tempo real através do aplicativo. Conta ainda com detecção inteligente de pessoas e comunicação bidirecional para maior praticidade e proteção.",
  especificacoes: `
  Marca: Xiaomi
  Modelo: Outdoor AW300
  Resolução: Full HD 2304x1296
  Conectividade: Wi-Fi
  Recursos: Visão noturna colorida, áudio bidirecional e detecção de pessoas
  Proteção: Certificação IP66
  Aplicação: Monitoramento externo residencial e comercial
  `
  },
  {
    id: 24,
    nome: "Ar Climax 18000 BTU Inverter",
  preco: 455.00,
  categoria: "Eletrodomésticos",
  images: ["img/ar-climax-18000.jpg"],
  desc: "O Ar-Condicionado Climax 18000 BTU Inverter é indicado para quem busca climatização eficiente com menor consumo de energia. Sua tecnologia Inverter ajuda a manter a temperatura estável, proporcionando mais conforto e economia ao longo do dia. Ideal para ambientes residenciais e comerciais de médio porte, oferece excelente desempenho e funcionamento silencioso.",
  especificacoes: `
  Marca: Climax
  Capacidade: 18000 BTU
  Tecnologia: Inverter
  Tipo: Split
  Funções: Refrigeração, ventilação e desumidificação
  Recursos: Controle remoto, timer e modos inteligentes
  `
  },
  {
    id: 25,
    nome: "Air Fryer RCA 3L",
  preco: 20.00,
  categoria: "Eletrodomésticos",
  images: ["img/airfryer-rca.jpg"],
  desc: "A Air Fryer RCA 3L é a escolha ideal para quem deseja preparar refeições mais práticas utilizando pouco ou nenhum óleo. Com circulação de ar quente em alta velocidade, proporciona alimentos crocantes por fora e macios por dentro. Seu design compacto é perfeito para cozinhas de todos os tamanhos, permitindo preparar diversos tipos de receitas com rapidez e praticidade.",
  especificacoes: `
  Marca: RCA
  Capacidade: 3 litros
  Tipo: Fritadeira sem óleo
  Controle: Temperatura ajustável
  Recursos: Timer e desligamento automático
  Aplicação: Fritar, assar e aquecer alimentos
  `
  },
  {
  id: 26,
  nome: "Jarra Elétrica Maryland",
  preco: 15.50,
  categoria: "Eletrodomésticos",
  images: ["img/jarra-maryland.jpg"],
  desc: "A Jarra Elétrica Maryland é indicada para quem busca praticidade e rapidez no preparo de bebidas quentes. Ideal para aquecer água para cafés, chás, chimarrão e diversas receitas, proporciona aquecimento rápido e eficiente, tornando o dia a dia mais conveniente. Seu design moderno combina funcionalidade e segurança para uso doméstico.",
  especificacoes: `
  Marca: Maryland
  Tipo: Jarra Elétrica
  Capacidade: Conforme modelo
  Função: Aquecimento rápido de água
  Recursos: Desligamento automático e proteção contra superaquecimento
  Aplicação: Cafés, chás e preparo de alimentos
  `
},
{
  id: 27,
  nome: "Moedor de Café Electrobras",
  preco: 33.00,
  categoria: "Eletrodomésticos",
  images: ["img/moedor-electrobras.jpg"],
  desc: "O Moedor de Café Electrobras é ideal para quem aprecia café fresco moído na hora. Compacto e eficiente, permite moer grãos de café de maneira rápida e uniforme, preservando o aroma e o sabor da bebida. Também pode ser utilizado para triturar especiarias e outros grãos, oferecendo versatilidade para a cozinha.",
  especificacoes: `
  Marca: Electrobras
  Tipo: Moedor Elétrico
  Aplicação: Café em grãos, especiarias e sementes
  Operação: Acionamento por botão
  Lâminas: Aço inoxidável
  Uso: Doméstico
  `
},
{
  id: 28,
  nome: "Solda Energy Inverter 100A",
  preco: 35.00,
  categoria: "Ferramentas",
  images: ["img/solda-energy.jpg"],
  desc: "A Máquina de Solda Energy Inverter 100A foi desenvolvida para proporcionar praticidade e eficiência em trabalhos de soldagem. Utilizando tecnologia inverter, oferece maior estabilidade do arco elétrico, menor consumo de energia e excelente desempenho para serviços de manutenção, serralheria e pequenos reparos. Compacta e fácil de transportar, é ideal para uso profissional e doméstico.",
  especificacoes: `
  Marca: Energy
  Tipo: Máquina de Solda Inverter
  Corrente Máxima: 100A
  Tecnologia: Inverter
  Aplicação: Soldagem de metais diversos
  Recursos: Baixo consumo e fácil transporte
  `
},
{
  id: 29,
  nome: "Esmerilhadeira Dewalt DCG412B",
  preco: 129.99,
  categoria: "Ferramentas",
  images: ["img/esmerilhadeira-dewalt.jpg"],
  desc: "A Esmerilhadeira Dewalt DCG412B foi projetada para profissionais que exigem potência, durabilidade e desempenho em cortes e desbastes. Seu design ergonômico proporciona maior conforto durante o uso, enquanto o motor de alta eficiência garante excelente produtividade em aplicações industriais, construção civil e manutenção geral.",
  especificacoes: `
  Marca: Dewalt
  Modelo: DCG412B
  Tipo: Esmerilhadeira Angular
  Diâmetro do Disco: 4-1/2 polegadas
  Alimentação: Bateria 20V MAX
  Aplicação: Corte, desbaste e acabamento
  Uso: Profissional
  `
},
{
  id: 30,
  nome: "Parafusadeira Dewalt DCD796D2",
  preco: 240.00,
  categoria: "Ferramentas",
  images: ["img/parafusadeira-dewalt.jpg"],
  desc: "A Parafusadeira/Furadeira Dewalt DCD796D2 é uma ferramenta versátil desenvolvida para trabalhos profissionais de perfuração e fixação. Equipada com motor Brushless de alta eficiência, oferece maior autonomia, desempenho e durabilidade. Seu sistema de impacto permite perfurar alvenaria, madeira e metal com facilidade, tornando-a uma excelente escolha para profissionais exigentes.",
  especificacoes: `
  Marca: Dewalt
  Modelo: DCD796D2
  Tipo: Furadeira e Parafusadeira de Impacto
  Motor: Brushless sem escovas
  Alimentação: Bateria 20V MAX
  Velocidades: 2 velocidades mecânicas
  Aplicação: Madeira, metal e alvenaria
  `
},
{
  id: 31,
  nome: "Dream Brand G-021 80ml",
  preco: 8.90,
  categoria: "Perfumes",
  images: ["img/dream-g021.jpg"],
  desc: "O Dream Brand G-021 é uma fragrância desenvolvida para quem busca elegância e personalidade no dia a dia. Sua composição combina notas harmoniosas que proporcionam uma sensação agradável de frescor e sofisticação, sendo uma excelente opção para uso diário ou ocasiões especiais.",
  especificacoes: `
  Marca: Dream Brand
  Modelo: G-021
  Volume: 80ml
  Categoria: Perfume
  Fixação: Longa duração
  Indicação: Uso diário e ocasiões especiais
  `
},
{
  id: 32,
  nome: "Dream Brand G-181 100ml",
  preco: 8.50,
  categoria: "Perfumes",
  images: ["img/dream-g181.jpg"],
  desc: "O Dream Brand G-181 é uma fragrância marcante criada para pessoas que valorizam estilo e sofisticação. Com excelente projeção e aroma agradável, proporciona uma experiência olfativa envolvente que acompanha você durante todo o dia.",
  especificacoes: `
  Marca: Dream Brand
  Modelo: G-181
  Volume: 100ml
  Categoria: Perfume
  Fixação: Prolongada
  Indicação: Uso diário
  `
},
{
  id: 33,
  nome: "Azzaro Pour Homme EDT",
  preco: 24.39,
  categoria: "Perfumes",
  images: ["img/azzaro.jpg"],
  desc: "Azzaro Pour Homme Eau de Toilette é um clássico da perfumaria masculina mundial. Sua fragrância sofisticada combina notas aromáticas, amadeiradas e especiadas, criando uma assinatura elegante e atemporal. Ideal para homens que valorizam personalidade, confiança e estilo em qualquer ocasião.",
  especificacoes: `
  Marca: Azzaro
  Linha: Pour Homme
  Tipo: Eau de Toilette
  Gênero: Masculino
  Família Olfativa: Aromática Fougère
  Indicação: Uso diário e ocasiões especiais
  `
},
{
  id: 34,
  nome: "Sistelle Paris Venitiene",
  preco: 22.90,
  categoria: "Perfumes",
  images: ["img/sistelle.jpg"],
  desc: "Sistelle Paris Venitiene é uma fragrância feminina elegante e envolvente, inspirada na sofisticação da perfumaria francesa. Sua composição harmoniosa proporciona um aroma delicado e marcante, ideal para mulheres que desejam destacar sua personalidade com charme e requinte.",
  especificacoes: `
  Marca: Sistelle Paris
  Linha: Venitiene
  Categoria: Perfume Feminino
  Família Olfativa: Floral Oriental
  Fixação: Longa duração
  Indicação: Uso diário e eventos especiais
  `
},
{
  id: 35,
  nome: "Lattafa Queen of Arabia",
  preco: 24.50,
  categoria: "Perfumes",
  images: ["img/lattafa-queen.jpg"],
  desc: "Lattafa Queen of Arabia é uma fragrância feminina inspirada na riqueza e na sofisticação da perfumaria árabe. Seu aroma combina notas doces, florais e orientais, criando uma experiência olfativa luxuosa e envolvente. Ideal para mulheres que desejam uma presença marcante e elegante.",
  especificacoes: `
  Marca: Lattafa
  Linha: Queen of Arabia
  Categoria: Perfume Feminino
  Família Olfativa: Oriental Floral
  Fixação: Excelente duração
  Indicação: Ocasiões especiais e uso noturno
  `
},
{
  id: 36,
  nome: "Lattafa Khamrah",
  preco: 14.75,
  categoria: "Perfumes",
  images: ["img/lattafa-khamrah.jpg"],
  desc: "Lattafa Khamrah é uma das fragrâncias árabes mais desejadas da atualidade. Conhecida por seu aroma intenso e sofisticado, combina notas especiadas, doces e amadeiradas que proporcionam excelente projeção e fixação. Uma escolha perfeita para quem busca um perfume marcante, elegante e memorável.",
  especificacoes: `
  Marca: Lattafa
  Linha: Khamrah
  Categoria: Eau de Parfum
  Família Olfativa: Oriental Especiada
  Fixação: Muito alta
  Projeção: Marcante
  Indicação: Eventos especiais e clima ameno
  `
},
  {
  id: 37,
  nome: "Camiseta Adidas",
  preco: 22.00,
  categoria: "Outros",
  images: ["img/camiseta-adidas.jpg"],
  desc: "A Camiseta Adidas é indicada para quem busca conforto, estilo e versatilidade no dia a dia. Produzida com materiais de qualidade, oferece excelente respirabilidade e ajuste confortável para atividades esportivas, momentos de lazer ou uso casual. Seu design moderno e a tradição da marca Adidas fazem desta peça uma excelente escolha para quem valoriza desempenho e estilo.",
  especificacoes: `
  Marca: Adidas
  Tipo: Camiseta Casual/Esportiva
  Material: Conforme modelo
  Modelagem: Confortável
  Aplicação: Uso diário, esportes e lazer
  Diferenciais: Design moderno e alta durabilidade
  `
},
{
  id: 38,
  nome: "Tênis Adidas Infantil",
  preco: 33.00,
  categoria: "Outros",
  images: ["img/tenis-adidas-infantil.jpg"],
  desc: "O Tênis Adidas Infantil foi desenvolvido para acompanhar as crianças em todas as atividades do dia a dia. Com design confortável, solado resistente e excelente ajuste aos pés, oferece segurança e praticidade para brincar, passear e praticar atividades físicas. Uma combinação perfeita entre conforto, qualidade e estilo.",
  especificacoes: `
  Marca: Adidas
  Tipo: Tênis Infantil
  Solado: Borracha resistente
  Fechamento: Conforme modelo
  Aplicação: Uso diário e atividades infantis
  Diferenciais: Conforto e durabilidade
  `
},
{
  id: 40,
  nome: "Maleta 8kg",
  preco: 12.50,
  categoria: "Outros",
  images: ["img/maleta.jpg"],
  desc: "A Maleta de Viagem 8kg é ideal para quem busca praticidade e organização durante viagens curtas ou deslocamentos frequentes. Compacta e funcional, oferece espaço suficiente para transportar roupas, acessórios e itens pessoais com conforto e segurança. Seu design moderno facilita o transporte e o armazenamento.",
  especificacoes: `
  Tipo: Maleta de Viagem
  Capacidade: Até 8kg
  Material: Conforme modelo
  Aplicação: Viagens curtas e uso diário
  Recursos: Compartimentos internos e alça para transporte
  `
},
{
  id: 41,
  nome: "Colchão Inflável Intex",
  preco: 16.99,
  categoria: "Outros",
  images: ["img/colchao-intex.jpg"],
  desc: "O Colchão Inflável Intex é uma excelente solução para acomodar visitas ou proporcionar mais conforto durante viagens e acampamentos. Fabricado com materiais resistentes e superfície confortável, oferece praticidade no transporte, armazenamento e utilização. Ideal para uso residencial ou atividades ao ar livre.",
  especificacoes: `
  Marca: Intex
  Tipo: Colchão Inflável
  Material: PVC resistente
  Aplicação: Casa, viagens e camping
  Recursos: Fácil inflagem e transporte
  Diferenciais: Conforto e praticidade
  `
},
{
  id: 42,
  nome: "TV LED 40” Marson MAS40 Smart Android",
  preco: 122.99,
  categoria: "TVs",
  images: ["img/tv-40-marson.jpg"],
  desc: "A Smart TV Marson MAS40 de 40 polegadas é indicada para quem busca entretenimento completo com excelente custo-benefício. Equipada com sistema Android, permite acessar aplicativos de streaming, vídeos, músicas e conteúdos online diretamente na televisão. Sua tela LED proporciona imagens nítidas e cores vibrantes, tornando filmes, séries e programas ainda mais envolventes.",
  especificacoes: `
  Marca: Marson
  Modelo: MAS40
  Tamanho da Tela: 40 polegadas
  Tipo: Smart TV LED
  Sistema Operacional: Android
  Recursos: Aplicativos de streaming, Wi-Fi e conteúdos online
  Conectividade: HDMI, USB e Wi-Fi
  `
},
{
  id: 43,
  nome: "TV LED 50” Marson MAS50 Smart Android",
  preco: 199.99,
  categoria: "TVs",
  images: ["img/tv-50-marson.jpg"],
  desc: "A Smart TV Marson MAS50 de 50 polegadas oferece uma experiência completa de entretenimento para toda a família. Com tela ampla, sistema Android integrado e acesso aos principais aplicativos de streaming, proporciona imagens envolventes e navegação intuitiva. Ideal para salas e ambientes que exigem uma experiência visual mais imersiva.",
  especificacoes: `
  Marca: Marson
  Modelo: MAS50
  Tamanho da Tela: 50 polegadas
  Tipo: Smart TV LED
  Sistema Operacional: Android
  Recursos: Streaming, navegação online e aplicativos
  Conectividade: HDMI, USB e Wi-Fi
  `
},
{
  id: 44,
  nome: "Ar Midea 24000 BTU Inverter com Kit",
  preco: 620.00,
  categoria: "Ar Condicionado",
  images: ["img/ar-midea-24000.jpg"],
  desc: "O Ar-Condicionado Midea 24000 BTU Inverter é ideal para climatizar ambientes amplos com eficiência, conforto e economia de energia. Sua tecnologia Inverter reduz oscilações de temperatura e melhora o desempenho do equipamento, proporcionando maior conforto térmico durante todo o dia. Acompanha kit de instalação, oferecendo ainda mais praticidade para o consumidor.",
  especificacoes: `
  Marca: Midea
  Capacidade: 24000 BTU
  Tecnologia: Inverter
  Tipo: Split
  Funções: Refrigeração, ventilação e desumidificação
  Recursos: Controle remoto e modos inteligentes
  Incluso: Kit de instalação
  `
},
{
  id: 45,
  nome: "Ar Clímax 12000 BTU Inverter Wi-Fi com Kit",
  preco: 310.00,
  categoria: "Ar Condicionado",
  images: ["img/ar-climax-12000.jpg"],
  desc: "O Ar-Condicionado Clímax 12000 BTU Inverter Wi-Fi oferece climatização eficiente com a praticidade do controle remoto via aplicativo. Sua tecnologia Inverter proporciona economia de energia e maior estabilidade na temperatura, enquanto a conectividade Wi-Fi permite monitorar e ajustar o funcionamento do equipamento de qualquer lugar. Acompanha kit de instalação.",
  especificacoes: `
  Marca: Clímax
  Capacidade: 12000 BTU
  Tecnologia: Inverter
  Conectividade: Wi-Fi
  Tipo: Split
  Recursos: Controle remoto e aplicativo
  Incluso: Kit de instalação
  `
},
{
  id: 46,
  nome: "Ar Clímax 18000 BTU Inverter com Kit",
  preco: 455.00,
  categoria: "Ar Condicionado",
  images: ["img/ar-climax-18000.jpg"],
  desc: "O Ar-Condicionado Clímax 18000 BTU Inverter foi desenvolvido para oferecer climatização eficiente e economia de energia em ambientes de médio e grande porte. Sua tecnologia Inverter proporciona funcionamento mais silencioso e controle preciso da temperatura, garantindo conforto durante todas as estações do ano. Acompanha kit de instalação.",
  especificacoes: `
  Marca: Clímax
  Capacidade: 18000 BTU
  Tecnologia: Inverter
  Tipo: Split
  Funções: Refrigeração, ventilação e desumidificação
  Recursos: Controle remoto e modos inteligentes
  Incluso: Kit de instalação
  `
},
{
  id: 47,
  nome: "Omeleteira Britânia 220V",
  preco: 15.50,
  categoria: "Eletroportáteis",
  images: ["img/omeleteira-britania.jpg"],
  desc: "A Omeleteira Britânia 220V é perfeita para quem busca praticidade na cozinha e deseja preparar refeições rápidas de forma simples. Com chapas antiaderentes e aquecimento uniforme, permite preparar omeletes, ovos e diversas receitas com rapidez e facilidade. Compacta e eficiente, é ideal para o dia a dia.",
  especificacoes: `
  Marca: Britânia
  Tipo: Omeleteira Elétrica
  Voltagem: 220V
  Revestimento: Antiaderente
  Recursos: Aquecimento rápido e uniforme
  Aplicação: Omeletes, ovos e receitas rápidas
  `
},
{
  id: 48,
  nome: "Air Fryer Instant 25 Litros",
  preco: 65.00,
  categoria: "Eletroportáteis",
  images: ["img/airfryer-instant-25l.jpg"],
  desc: "A Air Fryer Instant de 25 litros é ideal para famílias que buscam praticidade e versatilidade na cozinha. Com ampla capacidade interna, permite preparar grandes porções de alimentos, assar, gratinar, aquecer e fritar com pouco ou nenhum óleo. Seu sistema de circulação de ar quente proporciona cozimento uniforme, garantindo alimentos crocantes por fora e macios por dentro.",
  especificacoes: `
  Marca: Instant
  Capacidade: 25 Litros
  Tipo: Forno Air Fryer
  Funções: Assar, fritar, gratinar e aquecer
  Controle: Ajuste de temperatura e timer
  Aplicação: Uso doméstico e preparo de refeições para toda a família
  `
},
{
  id: 49,
  nome: "Air Fryer RCA 5 Litros 110V",
  preco: 23.00,
  categoria: "Eletroportáteis",
  images: ["img/airfryer-rca-5l.jpg"],
  desc: "A Air Fryer RCA 5 Litros é perfeita para quem deseja preparar refeições mais saudáveis de forma rápida e prática. Com capacidade ideal para o dia a dia, utiliza circulação de ar quente para cozinhar os alimentos com pouco ou nenhum óleo, preservando sabor e textura. Seu design moderno combina eficiência e praticidade para qualquer cozinha.",
  especificacoes: `
  Marca: RCA
  Capacidade: 5 Litros
  Voltagem: 110V
  Tipo: Fritadeira sem óleo
  Recursos: Controle de temperatura e timer
  Aplicação: Fritar, assar e aquecer alimentos
  `
},
{
  id: 50,
  nome: "Escova Giratória Smartfy ES01P 1200W",
  preco: 20.00,
  categoria: "Beleza",
  images: ["img/escova-smartfy.jpg"],
  desc: "A Escova Giratória Smartfy ES01P foi desenvolvida para quem deseja secar, modelar e dar volume aos cabelos de forma prática e rápida. Com potência de 1200W e rotação automática, facilita a criação de penteados enquanto reduz o tempo de finalização. Ideal para uso diário, proporciona cabelos mais alinhados e com acabamento profissional.",
  especificacoes: `
  Marca: Smartfy
  Modelo: ES01P
  Potência: 1200W
  Tipo: Escova Giratória
  Voltagem: Bivolt
  Recursos: Rotação automática e múltiplos ajustes de temperatura
  `
},
{
  id: 51,
  nome: "Kit Onida Removedor de Pelos ON-2025",
  preco: 15.00,
  categoria: "Beleza",
  images: ["img/removedor-onida.jpg"],
  desc: "O Kit Removedor de Pelos Onida ON-2025 oferece praticidade para os cuidados pessoais no dia a dia. Desenvolvido para remover pelos de forma rápida e confortável, possui design compacto e fácil manuseio. Ideal para quem busca uma solução prática para manter a pele sempre bem cuidada.",
  especificacoes: `
  Marca: Onida
  Modelo: ON-2025
  Tipo: Kit Removedor de Pelos
  Voltagem: Bivolt
  Aplicação: Cuidados pessoais
  Recursos: Uso prático e portátil
  `
},
{
  id: 52,
  nome: "Aparador de Barba Quanta QTCAS21",
  preco: 19.00,
  categoria: "Beleza",
  images: ["img/aparador-quanta.jpg"],
  desc: "O Aparador de Barba Quanta QTCAS21 foi desenvolvido para proporcionar cortes precisos e acabamento uniforme. Compacto e fácil de utilizar, permite aparar barba, bigode e detalhes com praticidade, garantindo um visual sempre bem cuidado. Ideal para uso doméstico e manutenção diária.",
  especificacoes: `
  Marca: Quanta
  Modelo: QTCAS21
  Tipo: Aparador de Barba
  Voltagem: Bivolt
  Aplicação: Barba, bigode e acabamento
  Recursos: Corte preciso e fácil manuseio
  `
},
{
  id: 53,
  nome: "Chapinha Britânia Titanium Blue",
  preco: 20.00,
  categoria: "Beleza",
  images: ["img/chapinha-britania.jpg"],
  desc: "A Chapinha Britânia Titanium Blue oferece aquecimento rápido e excelente desempenho para alisar os cabelos com praticidade. Suas placas revestidas ajudam a distribuir o calor de forma uniforme, proporcionando fios mais alinhados, brilhantes e com acabamento profissional. Ideal para quem deseja resultados rápidos e duradouros.",
  especificacoes: `
  Marca: Britânia
  Modelo: Titanium Blue
  Tipo: Prancha Alisadora
  Aquecimento: Rápido
  Revestimento: Titanium
  Aplicação: Alisamento e modelagem dos cabelos
  `
},
{
  id: 54,
  nome: "Secador Mondial SC-32 Rose 2000W",
  preco: 19.00,
  categoria: "Beleza",
  images: ["img/secador-mondial.jpg"],
  desc: "O Secador Mondial SC-32 Rose combina potência, praticidade e design moderno para o cuidado diário dos cabelos. Com 2000W de potência, proporciona secagem rápida e eficiente, reduzindo o tempo de finalização. Seus ajustes de temperatura e velocidade permitem adaptar o uso às diferentes necessidades dos fios.",
  especificacoes: `
  Marca: Mondial
  Modelo: SC-32 Rose
  Potência: 2000W
  Tipo: Secador de Cabelos
  Recursos: Ajuste de temperatura e velocidade
  Aplicação: Secagem e modelagem dos cabelos
  `
},
{
  id: 55,
  nome: "Ondulador Onida ON-057 28mm",
  preco: 18.00,
  categoria: "Beleza",
  images: ["img/ondulador-onida.jpg"],
  desc: "O Ondulador Onida ON-057 foi desenvolvido para criar ondas definidas e naturais com facilidade. Seu barril de 28mm permite modelar os cabelos de forma uniforme, proporcionando um visual elegante e moderno. Ideal para quem deseja variar os penteados sem abrir mão da praticidade.",
  especificacoes: `
  Marca: Onida
  Modelo: ON-057
  Diâmetro: 28mm
  Tipo: Ondulador de Cabelos
  Aplicação: Criação de ondas e cachos
  Recursos: Aquecimento rápido e fácil utilização
  `
},
{
  id: 56,
  nome: "Máscara Karseell 500ml",
  preco: 5.29,
  categoria: "Beleza",
  images: ["img/mascara-karseell.jpg"],
  desc: "A Máscara Capilar Karseell 500ml foi desenvolvida para proporcionar hidratação profunda, nutrição e recuperação dos fios. Sua fórmula auxilia na redução do ressecamento, melhora a maciez e contribui para cabelos mais saudáveis, brilhantes e fáceis de pentear. Ideal para todos os tipos de cabelo que necessitam de cuidados intensivos.",
  especificacoes: `
  Marca: Karseell
  Volume: 500ml
  Tipo: Máscara Capilar
  Benefícios: Hidratação, nutrição e brilho
  Aplicação: Todos os tipos de cabelo
  Uso: Tratamento capilar intensivo
  `
},
{
  id: 57,
  nome: "Bola Adidas Green",
  preco: 18.00,
  categoria: "Esportes",
  images: ["img/bola-adidas.jpg"],
  desc: "A Bola Adidas Green é ideal para momentos de lazer, treinos e partidas recreativas. Produzida com materiais resistentes e acabamento de qualidade, oferece boa durabilidade e desempenho durante o uso. Uma excelente opção para quem busca diversão e prática esportiva com a confiabilidade da marca Adidas.",
  especificacoes: `
  Marca: Adidas
  Modelo: Green
  Tipo: Bola Esportiva
  Material: Conforme modelo
  Aplicação: Treinos e lazer
  Diferenciais: Resistência e durabilidade
  `
},
{
  id: 58,
  nome: "Tênis Masculino Adidas Runfalcon",
  preco: 56.00,
  categoria: "Calçados",
  images: ["img/tenis-runfalcon.jpg"],
  desc: "O Adidas Runfalcon Masculino é um tênis versátil desenvolvido para corrida, caminhada e uso diário. Seu cabedal leve proporciona conforto durante todo o dia, enquanto o solado oferece estabilidade e aderência em diferentes superfícies. Ideal para quem busca desempenho, conforto e estilo em um único calçado.",
  especificacoes: `
  Marca: Adidas
  Modelo: Runfalcon
  Tipo: Tênis Masculino
  Aplicação: Corrida, caminhada e uso casual
  Solado: Borracha de alta durabilidade
  Diferenciais: Conforto, leveza e estabilidade
  `
},
{
  id: 59,
  nome: "Viva Bike Aro 29",
  preco: 235.00,
  categoria: "Esportes",
  images: ["img/bike-aro29.jpg"],
  desc: "A Viva Bike Aro 29 é ideal para quem busca uma bicicleta versátil para passeios urbanos, deslocamentos diários e trilhas leves. Seu aro 29 proporciona maior estabilidade, melhor absorção de obstáculos e mais conforto durante a pedalada. Com estrutura resistente e geometria projetada para o conforto do ciclista, é uma excelente opção para lazer e atividades esportivas.",
  especificacoes: `
  Marca: Viva Bike
  Aro: 29
  Tipo: Mountain Bike
  Aplicação: Uso urbano e trilhas leves
  Estrutura: Quadro resistente
  Diferenciais: Conforto, estabilidade e versatilidade
  `
},
{
  id: 60,
  nome: "Patinete Interbras 10.5 Pro Max",
  preco: 267.99,
  categoria: "Esportes",
  images: ["img/patinete-promax.jpg"],
  desc: "O Patinete Interbras 10.5 Pro Max foi desenvolvido para oferecer mobilidade moderna, conforto e praticidade. Equipado com rodas de 10,5 polegadas e estrutura robusta, proporciona uma condução estável em diferentes tipos de terreno. Ideal para deslocamentos urbanos, combina desempenho, autonomia e tecnologia para tornar os trajetos mais rápidos e agradáveis.",
  especificacoes: `
  Marca: Interbras
  Modelo: 10.5 Pro Max
  Tipo: Patinete Elétrico
  Rodas: 10,5 polegadas
  Aplicação: Mobilidade urbana
  Diferenciais: Estabilidade, conforto e desempenho
  `
},
{
  id: 61,
  nome: "Toys Motor Master",
  preco: 68.00,
  categoria: "Brinquedos",
  images: ["img/toys-motor.jpg"],
  desc: "O Toys Motor Master é um brinquedo desenvolvido para proporcionar diversão, criatividade e entretenimento para as crianças. Com design atrativo e detalhes inspirados em veículos motorizados, estimula a imaginação e a coordenação motora durante as brincadeiras. Ideal para momentos de lazer e diversão em família.",
  especificacoes: `
  Marca: Toys
  Linha: Motor Master
  Tipo: Brinquedo Infantil
  Aplicação: Diversão e entretenimento
  Material: Conforme modelo
  Diferenciais: Estimula criatividade e coordenação motora
  `
},
{
  id: 62,
  nome: "Carruagem da Princesa Inflável Intex",
  preco: 15.00,
  categoria: "Brinquedos",
  images: ["img/carruagem-intex.jpg"],
  desc: "A Carruagem da Princesa Inflável Intex transforma qualquer momento de lazer em uma experiência encantadora. Com design inspirado em contos de fadas, proporciona diversão para as crianças enquanto estimula a imaginação e a criatividade. Fabricada com materiais resistentes, é ideal para brincar em ambientes internos ou externos.",
  especificacoes: `
  Marca: Intex
  Tipo: Brinquedo Inflável
  Tema: Princesa
  Material: PVC resistente
  Aplicação: Lazer e recreação infantil
  Diferenciais: Design divertido e fácil transporte
  `
},
{
  id: 63,
  nome: "Esmerilhadeira Dewalt DCG412B",
  preco: 129.99,
  categoria: "Ferramentas",
  images: ["img/esmerilhadeira-dewalt.jpg"],
  desc: "A Esmerilhadeira Dewalt DCG412B foi projetada para profissionais que necessitam de potência, durabilidade e desempenho em trabalhos de corte, desbaste e acabamento. Seu motor de alta eficiência e design ergonômico garantem excelente produtividade e conforto durante o uso. Ideal para construção civil, oficinas e manutenção em geral.",
  especificacoes: `
  Marca: Dewalt
  Modelo: DCG412B
  Tipo: Esmerilhadeira Angular
  Alimentação: Bateria 20V MAX
  Disco: 4-1/2 polegadas
  Aplicação: Corte, desbaste e acabamento
  `
},
{
  id: 64,
  nome: "Politriz Ingco 20V APLI20151",
  preco: 115.00,
  categoria: "Ferramentas",
  images: ["img/politriz-ingco.jpg"],
  desc: "A Politriz Ingco APLI20151 foi desenvolvida para proporcionar acabamento profissional em superfícies automotivas e diversos materiais. Seu funcionamento eficiente permite realizar polimentos, remoção de pequenas imperfeições e acabamento com excelente qualidade. Ideal para profissionais da estética automotiva e usuários que buscam resultados de alto padrão.",
  especificacoes: `
  Marca: Ingco
  Modelo: APLI20151
  Alimentação: Bateria 20V
  Tipo: Politriz
  Aplicação: Polimento automotivo e acabamento
  Diferenciais: Ergonomia e praticidade
  `
},
{
  id: 65,
  nome: "Soprador Térmico UHG160078",
  preco: 14.99,
  categoria: "Ferramentas",
  images: ["img/soprador-termico.jpg"],
  desc: "O Soprador Térmico UHG160078 é uma ferramenta versátil indicada para aplicações como remoção de tintas, moldagem de materiais, secagem rápida e manutenção em geral. Seu fluxo de ar aquecido permite realizar diversos trabalhos com eficiência e praticidade, sendo uma excelente opção para profissionais e usuários domésticos.",
  especificacoes: `
  Modelo: UHG160078
  Tipo: Soprador Térmico
  Aplicação: Remoção de tintas, secagem e manutenção
  Controle: Ajuste de temperatura conforme modelo
  Uso: Profissional e doméstico
  `
},
{
  id: 66,
  nome: "Lattafa Al Noble Wazeer 100ml",
  preco: 17.99,
  categoria: "Perfumes",
  images: ["img/lattafa-wazeer.jpg"],
  desc: "Lattafa Al Noble Wazeer é uma fragrância sofisticada inspirada na tradição da perfumaria árabe. Sua composição combina notas amadeiradas, aromáticas e especiadas que criam uma presença marcante e elegante. Ideal para quem aprecia perfumes intensos, refinados e com excelente fixação.",
  especificacoes: `
  Marca: Lattafa
  Linha: Al Noble Wazeer
  Volume: 100ml
  Tipo: Eau de Parfum
  Família Olfativa: Amadeirada Aromática
  Fixação: Alta duração
  `
},
{
  id: 67,
  nome: "Lattafa Yara Elixir EDP 100ml",
  preco: 22.00,
  categoria: "Perfumes",
  images: ["img/lattafa-yara.jpg"],
  desc: "Lattafa Yara Elixir Eau de Parfum é uma fragrância feminina moderna, envolvente e sofisticada. Sua combinação de notas doces, florais e cremosas proporciona uma experiência olfativa elegante e marcante, perfeita para mulheres que desejam destacar sua personalidade com delicadeza e charme.",
  especificacoes: `
  Marca: Lattafa
  Linha: Yara Elixir
  Volume: 100ml
  Tipo: Eau de Parfum
  Família Olfativa: Floral Gourmand
  Fixação: Excelente duração
  `
},
{
  id: 68,
  nome: "Carolina Herrera 212 VIP Black 100ml",
  preco: 58.95,
  categoria: "Perfumes",
  images: ["img/212-vip-black.jpg"],
  desc: "212 VIP Black é uma fragrância masculina intensa, moderna e sedutora. Criada para homens confiantes e cheios de personalidade, combina notas aromáticas, especiadas e adocicadas que proporcionam uma assinatura olfativa marcante. Ideal para eventos noturnos, ocasiões especiais e momentos em que você deseja se destacar.",
  especificacoes: `
  Marca: Carolina Herrera
  Linha: 212 VIP Black
  Volume: 100ml
  Tipo: Eau de Parfum
  Família Olfativa: Aromática Fougère
  Indicação: Uso noturno e ocasiões especiais
  `
},
{
  id: 69,
  nome: "Chanel Allure Homme Sport 100ml",
  preco: 106.00,
  categoria: "Perfumes",
  images: ["img/chanel-allure.jpg"],
  desc: "Chanel Allure Homme Sport é uma fragrância masculina elegante e energética que combina frescor, sofisticação e intensidade. Suas notas cítricas, amadeiradas e especiadas criam um perfume versátil, ideal para homens ativos que desejam transmitir confiança e estilo em qualquer ocasião.",
  especificacoes: `
  Marca: Chanel
  Linha: Allure Homme Sport
  Volume: 100ml
  Tipo: Eau de Toilette
  Família Olfativa: Amadeirada Aromática
  Indicação: Uso diário e ocasiões especiais
  `
},
{
  id: 70,
  nome: "Orientica Royal Amber 80ml",
  preco: 49.00,
  categoria: "Perfumes",
  images: ["img/orientica-amber.jpg"],
  desc: "Orientica Royal Amber é uma fragrância luxuosa e sofisticada que combina notas orientais, doces e ambaradas em uma composição envolvente e elegante. Sua excelente projeção e longa duração fazem dele uma escolha perfeita para quem busca um perfume marcante e memorável.",
  especificacoes: `
  Marca: Orientica
  Linha: Royal Amber
  Volume: 80ml
  Tipo: Eau de Parfum
  Família Olfativa: Oriental Ambarada
  Fixação: Muito alta
  Indicação: Ocasiões especiais
  `
},
{
  id: 71,
  nome: "Kenzo Amour EDP 100ml",
  preco: 47.00,
  categoria: "Perfumes",
  images: ["img/kenzo-amour.jpg"],
  desc: "Kenzo Amour Eau de Parfum é uma fragrância feminina inspirada em uma viagem sensorial pelo Oriente. Delicado, envolvente e sofisticado, combina notas florais, cremosas e amadeiradas que transmitem conforto, feminilidade e elegância. Sua composição marcante cria uma experiência olfativa única, perfeita para mulheres que apreciam perfumes refinados e memoráveis.",
  especificacoes: `
  Marca: Kenzo
  Linha: Amour
  Volume: 100ml
  Tipo: Eau de Parfum
  Família Olfativa: Floral Amadeirada
  Fixação: Longa duração
  Indicação: Uso diário e ocasiões especiais
  `
},
{
  id: 72,
  nome: "Arqus La Bella EDP 100ml",
  preco: 8.90,
  categoria: "Perfumes",
  images: ["img/arqus-labella.jpg"],
  desc: "Arqus La Bella Eau de Parfum é uma fragrância feminina moderna e envolvente, criada para mulheres que desejam transmitir elegância e personalidade. Sua combinação de notas doces e florais proporciona um aroma agradável e sofisticado, ideal para acompanhar diferentes momentos do dia com charme e delicadeza.",
  especificacoes: `
  Marca: Arqus
  Linha: La Bella
  Volume: 100ml
  Tipo: Eau de Parfum
  Família Olfativa: Floral Gourmand
  Fixação: Boa duração
  Indicação: Uso diário
  `
},
{
  id: 73,
  nome: "Espumante Villa Sandi Rosé 750ml",
  preco: 8.99,
  categoria: "Bebidas",
  images: ["img/villa-sandi.jpg"],
  desc: "O Espumante Villa Sandi Rosé é uma opção elegante e refrescante para celebrações e momentos especiais. Produzido na Itália, apresenta coloração rosada delicada, aromas frutados e excelente equilíbrio em boca. Seu perfil leve e agradável harmoniza perfeitamente com aperitivos, frutos do mar e sobremesas leves.",
  especificacoes: `
  Marca: Villa Sandi
  Tipo: Espumante Rosé
  Volume: 750ml
  Origem: Itália
  Perfil: Leve e refrescante
  Harmonização: Aperitivos, frutos do mar e sobremesas
  `
},
{
  id: 74,
  nome: "Espumante Henkel Chardonnay 750ml",
  preco: 9.50,
  categoria: "Bebidas",
  images: ["img/henkell.jpg"],
  desc: "O Espumante Henkell Chardonnay combina tradição e qualidade em uma bebida elegante e versátil. Produzido a partir da uva Chardonnay, apresenta aromas frutados, perlage delicada e excelente equilíbrio entre frescor e suavidade. Ideal para brindar momentos especiais ou acompanhar refeições sofisticadas.",
  especificacoes: `
  Marca: Henkell
  Uva: Chardonnay
  Volume: 750ml
  Tipo: Espumante
  Perfil: Fresco e equilibrado
  Harmonização: Entradas, peixes e pratos leves
  `
},
{
  id: 75,
  nome: "Espumante Freixenet Ice Blanco 750ml",
  preco: 10.20,
  categoria: "Bebidas",
  images: ["img/freixenet-ice.jpg"],
  desc: "Freixenet Ice Blanco foi desenvolvido especialmente para ser apreciado com gelo, proporcionando uma experiência refrescante e moderna. Seus aromas frutados e florais combinam perfeitamente com dias quentes, encontros descontraídos e celebrações especiais. Um espumante versátil que une sofisticação e leveza.",
  especificacoes: `
  Marca: Freixenet
  Linha: Ice Blanco
  Volume: 750ml
  Tipo: Espumante
  Origem: Espanha
  Diferencial: Desenvolvido para consumo com gelo
  Harmonização: Aperitivos e momentos descontraídos
  `
},
{
  id: 76,
  nome: "Espumante Monte Paschoal Brut Rosé 750ml",
  preco: 6.70,
  categoria: "Bebidas",
  images: ["img/monte-paschoal.jpg"],
  desc: "O Monte Paschoal Brut Rosé é um espumante brasileiro elegante e refrescante, elaborado para proporcionar momentos especiais com excelente custo-benefício. Possui aromas delicados de frutas vermelhas, boa acidez e equilíbrio, tornando-se uma ótima escolha para comemorações e harmonizações variadas.",
  especificacoes: `
  Marca: Monte Paschoal
  Tipo: Brut Rosé
  Volume: 750ml
  Origem: Brasil
  Perfil: Frutado e refrescante
  Harmonização: Canapés, saladas e frutos do mar
  `
},
{
  id: 77,
  nome: "Espumante Fontana Fredda 750ml",
  preco: 9.30,
  categoria: "Bebidas",
  images: ["img/fontana-fredda.jpg"],
  desc: "O Espumante Fontanafredda representa a tradição italiana na produção de vinhos e espumantes de alta qualidade. Elegante e equilibrado, apresenta aromas delicados e ótima refrescância, sendo ideal para brindar ocasiões especiais ou acompanhar refeições leves e sofisticadas.",
  especificacoes: `
  Marca: Fontanafredda
  Volume: 750ml
  Tipo: Espumante
  Origem: Itália
  Perfil: Elegante e equilibrado
  Harmonização: Entradas, peixes e aperitivos
  `
},
{
  id: 78,
  nome: "Espumante Mionetto DOC Brut 750ml",
  preco: 9.50,
  categoria: "Bebidas",
  images: ["img/mionetto.jpg"],
  desc: "O Mionetto DOC Brut é um dos espumantes italianos mais reconhecidos do mundo. Produzido com uvas selecionadas, oferece aromas frutados, perlage fina e excelente frescor. Sua versatilidade o torna ideal tanto para celebrações quanto para harmonizações gastronômicas sofisticadas.",
  especificacoes: `
  Marca: Mionetto
  Tipo: DOC Brut
  Volume: 750ml
  Origem: Itália
  Perfil: Frutado e refrescante
  Harmonização: Aperitivos, massas e frutos do mar
  `
},
{
  id: 79,
  nome: "Vinho Catena Cabernet Sauvignon 750ml",
  preco: 11.99,
  categoria: "Bebidas",
  images: ["img/catena.jpg"],
  desc: "O Catena Cabernet Sauvignon é um dos vinhos mais prestigiados da Argentina, produzido pela renomada vinícola Catena Zapata. Elaborado com uvas cultivadas em altitude, apresenta excelente estrutura, notas de frutas escuras, especiarias e taninos equilibrados. Uma escolha perfeita para apreciadores de vinhos elegantes e expressivos.",
  especificacoes: `
  Marca: Catena
  Uva: Cabernet Sauvignon
  Volume: 750ml
  Origem: Argentina
  Perfil: Estruturado e elegante
  Harmonização: Carnes vermelhas, massas e queijos
  `
},
{
  id: 80,
  nome: "Vinho Bramare Cabernet Sauvignon 750ml",
  preco: 29.50,
  categoria: "Bebidas",
  images: ["img/bramare.jpg"],
  desc: "Bramare Cabernet Sauvignon é um vinho premium produzido pela Viña Cobos, reconhecida internacionalmente por seus rótulos de alta qualidade. Elaborado com uvas selecionadas de Mendoza, apresenta aromas complexos, excelente concentração e grande potencial de envelhecimento. Uma experiência sofisticada para apreciadores de vinhos de alta gama.",
  especificacoes: `
  Marca: Bramare
  Vinícola: Viña Cobos
  Uva: Cabernet Sauvignon
  Volume: 750ml
  Origem: Argentina
  Perfil: Complexo e encorpado
  Harmonização: Carnes nobres, cordeiro e queijos maturados
  `
},
{
  id: 81,
  nome: "Xiaomi Poco C85 8GB/256GB",
  preco: 112.99,
  categoria: "Celulares",
  images: ["img/poco-c85.jpg"],
  desc: "O Xiaomi Poco C85 é um smartphone desenvolvido para quem busca desempenho, armazenamento amplo e excelente custo-benefício. Com 8GB de memória RAM e 256GB de armazenamento interno, oferece fluidez para multitarefas, redes sociais, jogos e aplicativos do dia a dia. Sua tela ampla proporciona uma experiência confortável para vídeos, navegação e entretenimento.",
  especificacoes: `
  Marca: Xiaomi
  Linha: Poco C85
  Memória RAM: 8GB
  Armazenamento: 256GB
  Tela: Ampla para multimídia
  Conectividade: Wi-Fi, Bluetooth e 4G/5G conforme versão
  Aplicação: Uso diário, trabalho e entretenimento
  `
},
{
  id: 82,
  nome: "Oppo Reno 13 5G 12GB/512GB",
  preco: 457.99,
  categoria: "Celulares",
  images: ["img/oppo-reno13.jpg"],
  desc: "O Oppo Reno 13 5G combina tecnologia avançada, design moderno e alto desempenho. Equipado com 12GB de RAM e generosos 512GB de armazenamento interno, oferece excelente velocidade para multitarefas, jogos e produtividade. Sua conectividade 5G garante navegação rápida e uma experiência premium para usuários exigentes.",
  especificacoes: `
  Marca: Oppo
  Modelo: Reno 13 5G
  Memória RAM: 12GB
  Armazenamento: 512GB
  Conectividade: 5G
  Sistema: Android
  Aplicação: Produtividade, jogos e entretenimento
  `
},
{
  id: 83,
  nome: "Phone 17 Pro 256GB Orange",
  preco: 1199.00,
  categoria: "Celulares",
  images: ["img/iphone-17pro.jpg"],
  desc: "O Phone 17 Pro foi desenvolvido para oferecer desempenho de alto nível, recursos avançados e uma experiência premium em todos os momentos. Com 256GB de armazenamento, proporciona amplo espaço para fotos, vídeos, aplicativos e documentos. Seu design sofisticado na cor Orange destaca-se pela elegância e exclusividade.",
  especificacoes: `
  Modelo: Phone 17 Pro
  Armazenamento: 256GB
  Cor: Orange
  Tela: Alta definição
  Recursos: Câmeras avançadas e desempenho premium
  Conectividade: Wi-Fi, Bluetooth e rede móvel
  Aplicação: Uso profissional e entretenimento
  `
},
{
  id: 84,
  nome: "VGA RX9060XT ASRock 8GB",
  preco: 350.00,
  categoria: "Informática",
  images: ["img/rx9060xt.jpg"],
  desc: "A placa de vídeo ASRock RX9060XT 8GB foi projetada para entregar alto desempenho em jogos, criação de conteúdo e aplicações gráficas avançadas. Seus 8GB de memória dedicada permitem executar títulos modernos com excelente qualidade visual, além de acelerar tarefas relacionadas a edição de vídeos e renderização.",
  especificacoes: `
  Marca: ASRock
  Chip Gráfico: Radeon RX9060XT
  Memória de Vídeo: 8GB
  Tipo: Placa de Vídeo
  Aplicação: Games e criação de conteúdo
  Recursos: Alto desempenho gráfico
  `
},
{
  id: 85,
  nome: "CPU Intel i9-12900KS",
  preco: 310.00,
  categoria: "Informática",
  images: ["img/i9-12900ks.jpg"],
  desc: "O Intel Core i9-12900KS é um processador de alto desempenho desenvolvido para gamers, profissionais e entusiastas. Baseado na arquitetura híbrida da Intel, oferece excelente capacidade para multitarefas, jogos de última geração, edição de vídeo e aplicações exigentes. Uma escolha ideal para quem busca máxima performance.",
  especificacoes: `
  Marca: Intel
  Modelo: Core i9-12900KS
  Geração: 12ª Geração
  Tipo: Processador Desktop
  Aplicação: Games, edição e produtividade
  Arquitetura: Híbrida de alto desempenho
  `
},
{
  id: 86,
  nome: "Receptor IPTV Cine Box C+",
  preco: 41.90,
  categoria: "Eletrônicos",
  images: ["img/cinebox.jpg"],
  desc: "O Receptor Cine Box C+ foi desenvolvido para ampliar as opções de entretenimento doméstico, oferecendo acesso a conteúdos digitais e recursos multimídia. Compacto e fácil de instalar, proporciona uma experiência prática para quem deseja integrar diferentes fontes de conteúdo à televisão.",
  especificacoes: `
  Marca: Cine Box
  Modelo: C+
  Tipo: Receptor Multimídia
  Conectividade: HDMI e USB conforme versão
  Aplicação: Entretenimento doméstico
  Recursos: Reprodução de conteúdos digitais
  `
},
{
  id: 87,
  nome: "Multimídia Hetzer Argon Max HB20",
  preco: 199.99,
  categoria: "Automotivo",
  images: ["img/argon-max.jpg"],
  desc: "A Central Multimídia Hetzer Argon Max para HB20 foi desenvolvida para modernizar o sistema de entretenimento do veículo. Com interface intuitiva e recursos multimídia avançados, proporciona mais praticidade durante as viagens, permitindo acesso a músicas, vídeos, navegação e conectividade com dispositivos móveis.",
  especificacoes: `
  Marca: Hetzer
  Modelo: Argon Max
  Compatibilidade: Hyundai HB20
  Tipo: Central Multimídia
  Recursos: Reprodução de mídia e conectividade
  Aplicação: Entretenimento automotivo
  `
},
{
  id: 88,
  nome: "JBL PartyBox Encore 100W (2 Mic)",
  preco: 275.90,
  categoria: "Áudio",
  images: ["img/jbl-encore.jpg"],
  desc: "A JBL PartyBox Encore entrega som potente e muita diversão para festas, eventos e encontros com amigos. Com potência de 100W e dois microfones sem fio inclusos, é ideal para karaokês e apresentações. Seu áudio de alta qualidade e design portátil transformam qualquer ambiente em uma verdadeira celebração.",
  especificacoes: `
  Marca: JBL
  Linha: PartyBox Encore
  Potência: 100W
  Microfones: 2 inclusos
  Conectividade: Bluetooth e entradas de áudio
  Aplicação: Festas, eventos e karaokê
  `
},
{
  id: 89,
  nome: "Câmera Quanta QTCC80",
  preco: 23.00,
  categoria: "Segurança",
  images: ["img/quanta-qtcc80.jpg"],
  desc: "A Câmera Quanta QTCC80 é uma solução compacta para monitoramento de ambientes. Seu tamanho reduzido facilita a instalação em diferentes locais, permitindo acompanhar espaços internos de forma prática. Ideal para aplicações de observação e segurança em ambientes compatíveis com a legislação local.",
  especificacoes: `
  Marca: Quanta
  Modelo: QTCC80
  Tipo: Câmera Compacta
  Aplicação: Monitoramento de ambientes
  Instalação: Compacta e discreta
  Recursos: Captura de imagens e vídeos
  `
},
{
  id: 90,
  nome: "Câmera Corporal Satellite Body CS06",
  preco: 40.00,
  categoria: "Segurança",
  images: ["img/body-cs06.jpg"],
  desc: "A Câmera Corporal Satellite Body CS06 foi desenvolvida para registrar atividades em campo com praticidade e mobilidade. Seu formato portátil permite utilização em diferentes contextos profissionais, auxiliando na documentação de eventos e operações. Compacta e fácil de transportar, oferece uma solução eficiente para gravações em movimento.",
  especificacoes: `
  Marca: Satellite
  Modelo: Body CS06
  Tipo: Câmera Corporal
  Aplicação: Registro profissional de atividades
  Formato: Portátil
  Recursos: Captura de vídeo e áudio
  `
},
{
  id: 91,
  nome: "Impressora HP LaserJet Pro 4303FDW",
  preco: 450.00,
  categoria: "Informática",
  images: ["img/hp-4303fdw.jpg"],
  desc: "A Impressora HP LaserJet Pro 4303FDW é uma excelente opção para quem busca produtividade, qualidade de impressão e praticidade no ambiente de trabalho. Com tecnologia laser colorida, é ideal para escritórios, empresas, home office e rotinas que exigem impressões rápidas, nítidas e profissionais. Seu modelo multifuncional oferece recursos para imprimir, copiar, digitalizar e enviar fax, reunindo várias funções em um único equipamento.",
  especificacoes: `
  Marca: HP
  Linha: LaserJet Pro
  Modelo: 4303FDW
  Tecnologia: Laser colorida
  Funções: Impressão, cópia, digitalização e fax
  Conectividade: Wi-Fi, rede e USB
  Recursos: Impressão frente e verso, alimentador automático e painel de controle
  Aplicação: Escritórios, empresas, home office e ambientes corporativos
  `,
  video: ""
},

];

let produtos = produtosFallback;
window.produtos = produtos;

// Atualiza lista de produtos a partir do Supabase (se estiver configurado)
(async () => {
  try {
    if (typeof window.getProdutos === 'function') {
      produtos = await window.getProdutos();
      window.produtos = produtos;
    }
  } catch (e) {
    console.warn('Falha ao buscar produtos no Supabase, usando fallback local.', e);
  }
})();

// ===== CONTADOR CARRINHO =====
function atualizarContadorCarrinho() {
  const chaveCarrinho = obterChaveCarrinho();

const carrinho =
  JSON.parse(
    localStorage.getItem(chaveCarrinho)
  ) || [];
  const contador = document.getElementById("contadorCarrinho");
  if (contador) contador.innerText = carrinho.length;
}
atualizarContadorCarrinho();

// ===== ELEMENTOS =====
const listaProdutos = document.getElementById("listaProdutos");
const botoesCategorias = document.querySelectorAll(".categorias-lateral button");
const campoBusca = document.getElementById("buscaProduto");

// ===== NORMALIZAR TEXTO =====
function normalizar(txt) {
  return txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function gerarLinkProduto(p) {
  return `produto.html?id=${p.id}`;
}

// ===== RENDER PRODUTOS =====
function renderProdutos(cat = "Todos", termo = "") {
  if (!listaProdutos) return;

  listaProdutos.innerHTML = "";

  produtos
    .filter(p =>
      (cat === "Todos" || p.categoria === cat) &&
      normalizar(p.nome).includes(normalizar(termo))
    )
    .forEach(p => {
      const link = gerarLinkProduto(p);
      const img = (p.images && p.images[0]) ? p.images[0] : "";

      listaProdutos.innerHTML += `
        <div class="produto-card">
          <a href="${link}">
            <img src="${img}" alt="${p.nome}">
          </a>
          <h3>${p.nome}</h3>
          <p class="preco">U$ ${Number(p.preco).toFixed(2)}</p>
          <a href="${link}" class="btn-ver">Ver produto</a>
        </div>
      `;
    });
}
 

// categorias agora navegam pelo HTML



// ===== INICIAL =====
if (document.getElementById("listaProdutos")) {

  const params = new URLSearchParams(window.location.search);

  const categoria =
    params.get("cat") || "Todos";

  renderProdutos(categoria);

}
const relacionadosContainer = document.getElementById("produtosRelacionados");

function carregarRelacionados(produtoAtual) {
  const container = document.getElementById("produtosRelacionados");
  if (!container) return;

  container.innerHTML = "";

  // 1️⃣ filtra mesma categoria e remove o atual
  const relacionados = produtos.filter(p =>
    p.categoria === produtoAtual.categoria &&
    p.id !== produtoAtual.id
  );

  // 2️⃣ embaralha
  const embaralhados = relacionados.sort(() => Math.random() - 0.5);

  // 3️⃣ pega no máximo 4
  const finais = embaralhados.slice(0, 4);

  // 4️⃣ renderiza
  finais.forEach(p => {
    const link = gerarLinkProduto(p);
    const img = (p.images && p.images[0]) ? p.images[0] : "";
    const preco = Number(p.preco);

    container.innerHTML += `
      <div class="produto-card">
        <a href="${link}">
          <img src="${img}" alt="${p.nome}">
        </a>
        <h3>${p.nome}</h3>
        <p class="preco">U$ ${isNaN(preco) ? "0.00" : preco.toFixed(2)}</p>
        <a href="${link}" class="btn-ver">Ver produto</a>
      </div>
    `;
  });
}


// ===== DESCRIÇÃO AUTOMÁTICA =====
function gerarDescricaoMarketplace(produto) {
  const descBanco =
    produto.desc?.trim?.() ||
    produto.descricao?.trim?.() ||
    produto.descricao_completa?.trim?.() ||
    produto.descricaoCompleta?.trim?.() ||
    produto.description?.trim?.() ||
    "";

  const categoria = produto.categoria || "Produto";

  const bulletsPorCategoria = {
    "Consoles": [
      "Gráficos avançados e experiência imersiva",
      "Carregamento rápido e ótimo desempenho",
      "Ideal para jogos de nova geração"
    ],
    "Celulares": [
      "Desempenho fluido para o dia a dia",
      "Boa autonomia e conectividade",
      "Ideal para redes sociais, vídeos e aplicativos"
    ],
    "Áudio": [
      "Som potente e envolvente",
      "Ideal para filmes, músicas e jogos",
      "Conectividade prática"
    ],
    "TVs": [
      "Imagem de qualidade",
      "Recursos Smart",
      "Ideal para filmes, séries e entretenimento"
    ],
    "Eletrodomésticos": [
      "Mais praticidade para sua rotina",
      "Design moderno e funcional",
      "Ideal para uso diário"
    ],
    "Perfumes": [
      "Fragrância marcante",
      "Boa fixação",
      "Ideal para uso diário ou ocasiões especiais"
    ],
    "Ferramentas": [
      "Produto resistente e funcional",
      "Ideal para uso doméstico ou profissional",
      "Excelente desempenho no trabalho"
    ],
    "Eletrônicos": [
      "Tecnologia e praticidade",
      "Fácil utilização",
      "Ótimo custo-benefício"
    ]
  };

  const bullets = bulletsPorCategoria[categoria] || [
    "Produto versátil",
    "Boa qualidade",
    "Excelente opção para o dia a dia"
  ];

  return `
    <p>${descBanco || "Descrição não disponível."}</p>
    <ul>
      ${bullets.map(b => `<li>${b}</li>`).join("")}
    </ul>
  `;
}

window.gerarDescricaoMarketplace = gerarDescricaoMarketplace;

  
