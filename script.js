
// Mover tarjetas
let draggedCard = null;

// Función para hacer q una tarjeta se arrastre
function makeCardDraggable(card) {
  card.setAttribute('draggable', true);

  // Se arrastra
  card.addEventListener('dragstart', () => {
    draggedCard = card;
    card.classList.add('dragging'); 
  });

  // termina de moverse
  card.addEventListener('dragend', () => {
    draggedCard = null;
    card.classList.remove('dragging');
  });
}

// Función agrega el delete
function addDeleteListener(card) {
  const deleteBtn = card.querySelector('.delete');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', e => {
      e.stopPropagation(); // Evita interferencias con drag & drop
      card.remove(); // Borra la tarjeta
    });
  }
}

// Cargar las tarjetas
document.querySelectorAll('.card').forEach(card => {
  makeCardDraggable(card); // Arrastrables
  addDeleteListener(card); // Agregar btn de eliminar
});


// DRAG & DROP, arrastrar y soltar
document.querySelectorAll('.cards').forEach(container => {
  container.addEventListener('dragover', e => e.preventDefault());

  container.addEventListener('drop', e => {
    e.preventDefault();
    if (!draggedCard) return;

    // Se inserta la tarjeta en la posición correcta
    const afterElement = getCardAfter(container, e.clientY);
    if (!afterElement) {
      container.appendChild(draggedCard);
    } else {
      container.insertBefore(draggedCard, afterElement);
    }

    // Para que el btn de delete, elimine las tarjetas
    addDeleteListener(draggedCard);
  });
});


// Función para q tarjeta debe insertarse la tarjeta que arrastramos 
function getCardAfter(container, y) {
  const cards = [...container.querySelectorAll('.card:not(.dragging)')];

  return cards.reduce((closest, card) => {
    const box = card.getBoundingClientRect();

    //Calcula la distancia entre el raton y la tarjeta.
    // < 0 -> cursor está encima 
    // > 0 -> cursor está debajo
    const offset = y - box.top - box.height / 2; 
    
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: card };
    } else {
      return closest; //devuelve la tarj q este mas cerca
    }

   //offset a negativo, para asegurar que cualquier tarjeta válida lo reemplazará
  }, { offset: Number.NEGATIVE_INFINITY }).element; 
}


// Agregar, columnas
document.querySelectorAll('.column').forEach(column => {
  const addBtn = column.querySelector('.add-card-btn'); // + Añadir tarjeta
  const input = column.querySelector('.new-task'); // nueva tarjeta
  const taskActions = column.querySelector('.task-actions'); // btn de acción
  const confirmBtn = column.querySelector('.add-task'); // Btn Añadir tarjeta (Azul)
  const cancelBtn = column.querySelector('.delete2'); // btn cancelar
  const cardsContainer = column.querySelector('.cards'); // contenedor de tarjetas

  // Inicialmente ocultamos input y botones
  input.style.display = 'none';
  taskActions.style.display = 'none';

  // Mostrar input y botones al pulsar + Añadir tarjeta
  addBtn.addEventListener('click', () => {
    input.style.display = 'block';
    taskActions.style.display = 'flex';
    addBtn.style.display = 'none';
    input.focus();
  });

  
  // Btn Añadir tarjeta (Azul)
  confirmBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    // Crear tarjeta
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `<p>${text}</p><button class="delete"><i class='bx bxs-x-circle'></i></button>`; // ICONO eliminar

    cardsContainer.insertBefore(card, addBtn); // Para que se añada primero el +Añadir T. Card/ addBtn


    // Hacer la nueva tarjeta arrastrable + delete
    makeCardDraggable(card);
    addDeleteListener(card);

    // Reinicia el imput (Introduce un título..)
    input.value = '';
    input.style.display = 'none';
    taskActions.style.display = 'none';
    addBtn.style.display = 'block';
  });

  // Se añade la tarjeta con el click del ratón
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') confirmBtn.click();
  });

   // Borrar tarjetas
  cancelBtn.addEventListener('click', () => {
    input.value = '';
    input.style.display = 'none';
    taskActions.style.display = 'none';
    addBtn.style.display = 'block';
  });

});