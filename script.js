
// Columnas
document.querySelectorAll('.column').forEach(column => {
  const addBtn = column.querySelector('.add-card-btn'); // + Añadir tarjeta
  const input = column.querySelector('.new-task'); //nueva tarjeta
  const taskActions = column.querySelector('.task-actions'); //acción

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
  const confirmBtn = column.querySelector('.add-task');
  confirmBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    // Crear tarjeta
    const card = document.createElement('article');
    card.classList.add('card');
    card.innerHTML = `<p>${text}</p><button class="delete"><i class='bx bxs-x-circle'></i></button>`; //ICONO

    const cardsContainer = column.querySelector('.cards');
    cardsContainer.insertBefore(card, addBtn); // Para que se añada primero el +Añadir T. Card/ addBtn 

    // Reinicia el imput (Introduce un título..)
    input.value = '';
    input.style.display = 'none';
    taskActions.style.display = 'none';
    addBtn.style.display = 'block';

  });


  // Segundo Icono
  const cancelBtn = column.querySelector('.delete2');
  cancelBtn.addEventListener('click', () => {
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
  const cardsContainer = column.querySelector('.cards');
  cardsContainer.addEventListener('click', e => {
    if (e.target.closest('.delete')) e.target.closest('.card').remove();
  });

});
