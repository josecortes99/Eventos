const API_SUSCRIPCIONES = 'http://localhost:3000/suscripciones';
const tabla = document.getElementById('tabla-suscripciones');

document.addEventListener('DOMContentLoaded', () => {
  fetch(API_SUSCRIPCIONES)
    .then(res => res.json())
    .then(data => {
      tabla.innerHTML = '';
      data.forEach(item => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${item.id}</td>
          <td>${item.correo}</td>
          <td><a href="#" class="eliminar" data-id="${item.id}">Eliminar</a></td>
        `;
        tabla.appendChild(fila);
      });
      activarEliminar();
    });
});

function activarEliminar() {
  document.querySelectorAll('.eliminar').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = e.target.dataset.id;
      fetch(`${API_SUSCRIPCIONES}/${id}`, { method: 'DELETE' })
        .then(() => location.reload());
    });
  });
}