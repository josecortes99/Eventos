async function cargarEventos() {
  const res = await fetch("http://localhost:3000/eventos");
  const res1 = await fetch("http://localhost:3000/contactos")
  const res2 = await fetch("http://localhost:3000/suscripciones");
  const eventos = await res.json();
  const contact = await res1.json();
  const sus = await res2.json();

  const activos = eventos.filter(e => e.estado === "activo").length;
  const cancelados = eventos.filter(e => e.estado === "cancelado").length;
  const inactivos = eventos.filter(e => e.estado === "inactivo").length;
  const total = eventos.length;
  const correos = sus.length;
  const contacto = contact.length;

  const dashboardEventos = document.querySelector(".dashboard-eventos");
  dashboardEventos.innerHTML = `
    <div class="dashboard-card green">
      <h3>${activos}</h3>
      <p>Eventos Activos</p>
    </div>
    <div class="dashboard-card red">
      <h3>${cancelados}</h3>
      <p>Eventos Cancelados</p>
    </div> 
    <div class="dashboard-card yellow">
      <h3>${inactivos}</h3>
      <p>Eventos Inactivos</p>
    </div>
    <div class="dashboard-card blue">
      <h3>${total}</h3>
      <p>Eventos Totales</p>
    </div>
  `;

  const dashboardExtra = document.querySelector(".dashboard-extra");
  dashboardExtra.innerHTML = `
    <div class="dashboard-card gray">
      <h3>${correos}</h3>
      <p>Correos Registrados</p>
    </div>
    <div class="dashboard-card gray">
      <h3>${contacto}</h3>
      <p>Mensajes de Contacto</p>
    </div>
  `;
}

cargarEventos();

