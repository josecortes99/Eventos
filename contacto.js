const API_CONTACTOS = 'http://localhost:3000/contactos';
const mensajesContenedor = document.getElementById('contenedor-mensajes');
const buscador = document.getElementById('buscar');
let todosLosContactos = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch(API_CONTACTOS)
    .then(res => res.json())
    .then(data => {
      todosLosContactos = data;
      mostrarContactos(data);
    });
});

buscador.addEventListener('input', () => {
  const texto = buscador.value.toLowerCase();
  const filtrados = todosLosContactos.filter(c =>
    c.nombre.toLowerCase().includes(texto)
  );
  mostrarContactos(filtrados);
});

function mostrarContactos(lista) {
  mensajesContenedor.innerHTML = '';
  if (lista.length === 0) {
    mensajesContenedor.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }

  lista.forEach(contacto => {
    const card = document.createElement('div');
    card.classList.add('message-card');
    card.innerHTML = `
      <div class="message-header">
        <strong>${contacto.nombre}</strong>
        <span>${contacto.fecha}</span>
      </div>
      <p class="message-body">${contacto.mensaje}</p>
      <p class="email">${contacto.correo}</p>
    `;
    mensajesContenedor.appendChild(card);
  });
}