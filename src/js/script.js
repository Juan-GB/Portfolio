class DetailsMainSection {
  constructor({ titulo, texto, imagem }) {
    this.titulo = titulo;
    this.texto = texto;
    this.imagem = imagem;
  }

  // Criando elementos html
  generateElement() {
    const section = document.createElement("section");
    section.id = "details-main";
    section.innerHTML = `
            <div>
                <h3>${this.titulo}</h3>
                <p>${this.texto}</p>
            </div>
            <img src="${this.imagem}" alt="${this.titulo}">
        `;
    return section;
  }
}

class SandwichMenuButton {
  constructor({ imageActivated, imageDesactivated, container_query }) {
      this.container_query = container_query;
  }

  generateElement() {
    let div = document.createElement('div');
    div.id = "sandwich-menu-button";

    let input = document.createElement('input');
    input.type = 'checkbox';
    input.name = `input-${this.container_query}`;
    input.id = `input-${this.container_query}`;

    let label = document.createElement('label');
    label.setAttribute('for', `input-${this.container_query}`);
    label.id = `label-${this.container_query}`;

    div.appendChild(input);
    div.appendChild(label);

    return div;
  }
}

class ReturnButton {
  constructor({ image, container_id_to_close }) {
    this.image = image;
    this.container_id_to_close = container_id_to_close;
  }

  generateElement() {
    const container_id_to_close = this.container_id_to_close;

    let return_button = document.createElement("a");
    return_button.innerHTML = `<img src="${this.image}"/>`;
    return_button.addEventListener("click", function () {
      document.querySelector(`#${container_id_to_close}`).remove();
    });

    return return_button;
  }
}

class ImageElement {
  constructor({ src, alt }) {
    this.src = src;
    this.alt = alt;
  }

  generateElement() {
    const img = document.createElement("img");
    img.src = this.src;
    img.alt = this.alt;
    return img;
  }
}

class Navigation {
  constructor({ project, tab_title }) {
    this.project = project;
    this.tab_title = tab_title;
  }

  generateElement() {
    let navigation = document.createElement("nav");

    for (const [key, value] of Object.entries(this.project.details)) {
      const nav_item = document.createElement("a");
      nav_item.innerHTML = value.titulo;
      nav_item.addEventListener("click", () => {
        showProjectDetails(this.project.name, key);
      });
      if (key == this.tab_title) {
        nav_item.className = "tab-active";
      }
      navigation.appendChild(nav_item);
    }

    return navigation;
  }
}

class DetailsHeaderSection {
  constructor({ project, tab_title }) {
    this.project = project;
    this.tab_title = tab_title;
  }

  generateElement() {
    const header = document.createElement("header");


    let return_button = new ReturnButton({
      image: "./src/images/return-arrow.svg",
      container_id_to_close: "details-container",
    }).generateElement();

    let logo = new ImageElement({
      src: this.project.image,
      alt: this.project.title,
    }).generateElement();
    
    let sandwich_button = new SandwichMenuButton({container_query: 'nav'}).generateElement();

    let nav = new Navigation({
      project: this.project,
      tab_title: this.tab_title,
    }).generateElement();

    header.appendChild(return_button);
    header.appendChild(logo);
    header.appendChild(nav);
    header.appendChild(sandwich_button);

    return header;
  }
}

class Tab {
  constructor({ titulo, texto, imagem }) {
    this.titulo = titulo;
    this.texto = texto;
    this.imagem = imagem;
  }
}

class Project {
  constructor({ name, state, image, backgroundColor, description, details }) {
    this.name = name;
    this.state = state;
    this.image = image;
    this.backgroundColor = backgroundColor;
    this.description = description;
    this.details = details;
  }
}

class DetailsContainer {
  constructor({ project, backgroundColor }) {
    this.project = project;
    this.backgroundColor = backgroundColor;
  }

  generateElement() {
    const container = document.createElement("section");
    container.id = "details-container";
    container.style.backgroundColor = `
        background: linear-gradient(to bottom right, ${backgroundColor[0]}, ${backgroundColor[1]});
        `;

    return container;
  }
}

const projectsData = [
  new Project({
    name: "Booktok",
    state: 'concluded',
    image: "./src/images/booktok/logo.png",
    backgroundColor: ["#735B2F", "#412E0B"],
    description: "E-commerce focado na venda de livros físicos.",
    details: {
      conceito: new Tab({
        titulo: "Conceito",
        texto: `O “Booktok” foi concebido como um projeto integrador durante meu curso técnico. Ele consiste em um aplicativo dedicado à venda de livros físicos, inspirado em uma tendência do TikTok frequentada por leitores da plataforma. 
                <br><br>
                A ideia era confecionar um aplicativo semi-funcional, integrado a um banco de dados com sistema de login e carrinho de compras além dos livros estarem todos registrados no mesmo.`,
        imagem: "./src/images/booktok/conceito.png",
      }),
      funcionamento: new Tab({
        titulo: "Funcionamento",
        texto: `O projeto foi realizado por uma equipe de quatro membros, com aproximadamente um mês para sua concepção e implementação. 
                <br><br>
                Inicialmente, realizamos uma fase de pesquisa para identificar os requisitos do projeto e elaboramos um organograma delineando o funcionamento básico do aplicativo. Com base nesse esquema, desenvolvemos todo o layout da aplicação, incluindo design de elementos e logomarca. Essa etapa foi facilitada pela clareza proporcionada pelo organograma.`,
        imagem: "./src/images/booktok/funcionamento.png",
      }),
      tecnologias: new Tab({
        titulo: "Tecnologias",
        texto: `Para o desenvolvimento do aplicativo, utilizamos Dart como linguagem de programação e o Framework Flutter para aplicativos móveis. Além disso, implementamos um banco de dados utilizando o Appwrite, visando adicionar complexidade ao projeto. 
                <br><br>
                Essas escolhas foram motivadas pelo amplo suporte da comunidade e pela extensa documentação, simplificando significativamente o desenvolvimento. Também foi desenvolvida uma versão voltada para o administrador, que permitia o controle do catálogo de livros através de um CRUD integrado ao banco de dados.`,
        imagem: "./src/images/booktok/tecnologias.png",
      }),
      conclusao: new Tab({
        titulo: "Conclusão",
        texto: `
                O projeto resultou em um aplicativo com um design intuitivo, semi-funcional, incluindo sistema de login e carrinho de compras integrado ao banco de dados. 
                <br><br>
                Além disso, cadastramos 100 livros no aplicativo, completos com fotos, títulos, resenhas, preços e diversos gêneros literários. 
                <br><br>
                A organização e o planejamento foram fundamentais para o sucesso do projeto, que atendeu aos requisitos estabelecidos e entregou uma solução viável para o comércio de livros físicos.
                `,
        imagem: "./src/images/booktok/conclusao.png",
      }),
    },
  }),
  new Project({
    name: "LeleGourmetJF",
    state: 'concluded',
    image: "./src/images/lelegourmetjf/logo.png",
    backgroundColor: ["#360C04", "#7A4D23"],
    description: "Site de captação de clientes para confeitaria.",
    details: {
      conceito: new Tab({
        titulo: "Conceito",
        texto: `A "Lele Gourmet JF" é uma confeitaria localizada em Juiz de Fora, especializada na produção e venda de bolos, doces e salgados. O objetivo principal do site é apresentar os produtos aos clientes de forma atrativa e convidativa. Ao clicar nos produtos, os clientes são direcionados para o WhatsApp da loja, onde podem realizar suas compras de forma rápida e conveniente com o atendimento da loja.<br><br>
        O site ainda está em desenvolvimento mas se encontra nos estagios finais, faltam algumas fotos que vão ser providas pela loja para inserir no site.`,
        imagem: "./src/images/lelegourmetjf/conceito.png",
      }),
      funcionamento: new Tab({
        titulo: "Funcionamento",
        texto: `Antes do desenvolvimento do site, foi realizado um processo completo de design e planejamento. Cada aspecto do site, desde a estrutura de navegação até o layout visual, foi cuidadosamente planejado para garantir uma experiência de usuário atraente. 
        <br><br>
        O site foi desenvolvido utilizando conhecimentos de HTML, CSS e JavaScript, juntamente com a API do WhatsApp, para que o cliente fosse redirecionado diretamente para o contato da empresa com o seu pedido digitado, bastando só ele clicar em enviar para continuar o atendimento.`,
        imagem: "./src/images/lelegourmetjf/funcionamento.png",
      }),
      tecnologias: new Tab({
        titulo: "Tecnologias",
        texto: `Para o desenvolvimento do site, foram utilizadas as tecnologias básicas de desenvolvimento web: HTML para a estruturação do conteúdo, CSS para o estilo e design visual, e JavaScript para a interatividade e funcionalidades dinâmicas. 
        <br><br>
        Essas tecnologias foram escolhidas por sua ampla compatibilidade e capacidade de criar um site responsivo, que se adapta a diferentes dispositivos e tamanhos de tela.`,
        imagem: "./src/images/lelegourmetjf/tecnologias.png",
      }),
      conclusao: new Tab({
        titulo: "Conclusão",
        texto: `Em resumo, o site da Lele Gourmet JF é uma plataforma simples e eficaz para apresentar os produtos da confeitaria aos clientes e facilitar o processo de compra. Com um design atrativo e funcionalidades intuitivas, o site proporciona uma experiência de usuário agradável e incentiva os clientes a entrarem em contato com a loja para fazerem seus pedidos. 
        <br><br>
        O processo de design e planejamento prévio foi fundamental para garantir o sucesso do projeto e a satisfação dos clientes.`,
        imagem: "./src/images/lelegourmetjf/conclusao.png",
      }),
    },
  }),
  new Project({
    name: "Clone do Zap",
    state: 'development',
    image: "./src/images/clone-zap/logo.png",
    backgroundColor: ["#2f4d2c", "#111111"],
    description: "Clone do WhatsApp totalmente funcional",
    details: {}
  }),
];

function addProjects() {
  const projectContainer = document.getElementById("project-container");

  projectsData.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.style.backgroundColor = project.backgroundColor[0];

    const projectImage = document.createElement("img");
    projectImage.src = project.image;
    projectImage.alt = `Projeto ${index + 1}`;

    const projectInfo = document.createElement("div");
    projectInfo.classList.add("project-info");

    const projectText = document.createElement("p");
    projectText.classList.add("project-text");
    projectText.textContent = project.description;

    if(project.state == 'concluded') {
      const learnMoreBtn = document.createElement("button");
      learnMoreBtn.textContent = "Saiba Mais";
      // Modificar o evento de clique para exibir os detalhes do projeto
      learnMoreBtn.addEventListener("click", () => {
        showProjectDetails(project.name, "conceito");
      });

      projectInfo.appendChild(projectText);
      projectInfo.appendChild(learnMoreBtn);
    } else {
      const span = document.createElement("span");
      span.innerHTML = "Em desenvolvimento";

      projectInfo.appendChild(projectText);
      projectInfo.appendChild(span);
    }

    projectCard.appendChild(projectImage);
    projectCard.appendChild(projectInfo);
    projectContainer.appendChild(projectCard);
  });
}

function getCurrentProject(project_name) {
  let project;
  projectsData.forEach((e) => {
    if (e.name == project_name) {
      project = e;
    }
  });

  return project;
}

function showProjectDetails(project_name, tab_title) {
  try {
    document.querySelector("#details-container").remove();
  } catch (error) {}

  let current_project = getCurrentProject(project_name);
  let current_tab = current_project.details[tab_title];


  // Create Details Container
  let details_container = document.createElement("section");
  details_container.id = "details-container";
  details_container.style = `
        background: linear-gradient(to bottom right, ${current_project.backgroundColor[0]}, ${current_project.backgroundColor[1]});`;

  document.querySelector("body").appendChild(details_container);


  // Generate Header and Main of Details
  details_header = new DetailsHeaderSection({
    project: current_project,
    tab_title: tab_title,
  }).generateElement();

  let details_main = new DetailsMainSection({
    titulo: current_tab.titulo,
    texto: current_tab.texto,
    imagem: current_tab.imagem,
  }).generateElement();


  details_container.appendChild(details_header);
  details_container.appendChild(details_main);
}
