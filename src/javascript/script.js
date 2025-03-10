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
