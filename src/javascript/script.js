// ! Funções

function createElement(name, elements = [], attributes = null) {
  if (!Array.isArray(elements) && typeof elements !== "string") {
    [elements, attributes] = [attributes, elements];
    if (elements === null) {
      elements = "";
    }
  }
  const el = document.createElement(name);
  for (const prop in attributes) {
    const attr = attributes[prop];
    if (prop === "style") {
      for (const stl in attr) {
        el.style[stl] = attr[stl];
      }
    } else {
      el.setAttribute(prop, attr);
    }
  }
  // array of elements
  if (Array.isArray(elements) && elements.at(0) instanceof HTMLElement) {
    el.append(...elements);
    // raw HTML
  } else if (typeof elements === "string") {
    el.innerHTML = elements;
    // single element
  } else if (elements instanceof HTMLElement) {
    el.append(elements);
  }
  return el;
}

function makeCardDraggable(card) {
  card.addEventListener("dragstart", (e) => {
    e.currentTarget.classList.add("dragging");
  });
  // Quando soltar o card, remover a classe "dragging"
  card.addEventListener("dragend", (e) => {
    e.currentTarget.classList.remove("dragging");
  });
}

// ! Adicionar tarefa

const form = document.querySelector("#task-form");
const button = document.querySelector("#add-task-button");
const taskTitleInput = document.querySelector("#task-title-input");
const kanbanPending = document.querySelector("#kanban-pending");

let tasks = [];

form.addEventListener("submit", (event) => {
  // Evitar comportamento padrão de recarregar a pagina ao submeter o formulário
  event.preventDefault();

  // Pegar título da tarefa
  const taskTitle = taskTitleInput.value;

  // Adicionar tarefa no Array
  tasks.push(taskTitle);

  // Adicionar tarefa no HTML

  const cE = createElement;

  const card = cE("li", { class: "kanban-card", draggable: true }, [
    cE("div", { class: "badge high" }, [cE("span", "Alta prioridade")]),
    cE("p", { class: "card-title" }, taskTitle),
    cE("div", { class: "card-infos" }, [
      // cE("div", { class: "card-icons" }, [
      //   cE("p", cE[("i", { class: "fa-regular fa-comment" }, "1")]),
      //   cE("p", cE[("i", { class: "fa-solis fa-paperclip" }, "1")]),
      // ]),
      cE("div", { class: "user" }, [
        cE("img", {
          src: "src/images/androgynous-avatar-non-binary-queer-person (1).jpg",
          alt: "Avatar",
        }),
      ]),
    ]),
  ]);
  makeCardDraggable(card);

  kanbanPending.appendChild(card);

  // Limpar input
  taskTitleInput.value = "";
});

// Definir que o card pode ser arrastado

// Pegar cards
document.querySelectorAll(".kanban-card").forEach((card) => {
  // Quando segurar e arrastar o card, adicionar a classe "dragging"
  card.addEventListener("dragstart", (e) => {
    e.currentTarget.classList.add("dragging");
  });
  // Quando soltar o card, remover a classe "dragging"
  card.addEventListener("dragend", (e) => {
    e.currentTarget.classList.remove("dragging");
  });
});

// ! Permitir que a coluna receba o card

// Pegar colunas

document.querySelectorAll(".kanban-cards").forEach((column) => {
  // Quando o card for arrastado sobre uma coluna
  column.addEventListener("dragover", (e) => {
    // Tirar comportamento padrão para permitir que arraste uma coisa por cima da outra. Sem isso o navegador não permite que arraste um elemento sobre outro elemento.
    e.preventDefault();
    // Adicionar classe "cards-hover": Mudar a cor da coluna
    e.currentTarget.classList.add("cards-hover");
  });

  // Quando o card não estiver sendo arrastado sobre a coluna
  column.addEventListener("dragleave", (e) => {
    // Tirar comportamento padrão para permitir que arraste uma coisa por cima da outra
    e.preventDefault();
    // Remover classe "cards-hover", que muda a cor
    e.currentTarget.classList.remove("cards-hover");
  });

  // Quando o card for solto na coluna
  column.addEventListener("drop", (e) => {
    // Remover classe cards-hover, para sair a cor
    e.currentTarget.classList.remove("cards-hover");

    // Adicionar card na coluna: Selecionar card com a classe "dragging"
    const dragCard = document.querySelector(".kanban-card.dragging");

    e.currentTarget.appendChild(dragCard);
  });
});
