const API_URL = "http://localhost:3000/eventos";
const contenedor = document.getElementById("eventos");
const inputBusqueda = document.getElementById("busqueda");

async function obtenerEventos() {
  const res = await fetch(API_URL);
  const eventos = await res.json();
  renderizarEventos(eventos);
}

async function eliminarEvento(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    obtenerEventos(); 
  }
}

async function cambiarEstadoEvento(id, nuevoEstado) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ estado: nuevoEstado })
  });

  if (res.ok) {
    obtenerEventos();
  }
}

function renderizarEventos(lista) {
  contenedor.innerHTML = "";

  lista.forEach(evento => {
    const div = document.createElement("div");
    div.className = "evento";

    div.innerHTML = `
      <div class="imagen">
        ${evento.imagen
          ? `<img src="${evento.imagen}" alt="${evento.titulo}" class="img-evento">`
          : `<div class="img-placeholder">Sin imagen</div>`}
      </div>

      <div class="info">
        <strong>${evento.titulo}</strong><br>
        <span>${evento.descripcion}</span><br>
        <button class="cambiar-estado" data-id="${evento.id}" data-estado="${evento.estado}">
          Cambiar estado
        </button><br>
        <button class="eliminar" data-id="${evento.id}">Eliminar</button>
      </div>

      <div class="estado-fecha">
        <div class="estado ${evento.estado === "inactivo" ? "inactivo" : ""}">
          ${evento.estado}
        </div>
        <div>${evento.fecha}</div>
      </div>
    `;

    contenedor.appendChild(div);
  });

  document.querySelectorAll(".eliminar").forEach(boton => {
    boton.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");
      await eliminarEvento(id);
    });
  });

  document.querySelectorAll(".cambiar-estado").forEach(boton => {
    boton.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");
      const estadoActual = e.target.getAttribute("data-estado");
      const nuevoEstado = estadoActual === "activo" ? "inactivo" : "activo";
      await cambiarEstadoEvento(id, nuevoEstado);
    });
  });
}

inputBusqueda.addEventListener("input", async function (e) {
  const texto = e.target.value.toLowerCase();
  const res = await fetch(API_URL);
  const eventos = await res.json();

  const filtrados = eventos.filter(evento =>
    evento.titulo.toLowerCase().includes(texto)
  );

  renderizarEventos(filtrados);
});

obtenerEventos();
