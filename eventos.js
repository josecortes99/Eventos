document.addEventListener("DOMContentLoaded", () => {
  const API_EVENT = "http://localhost:3000";

  // Botones que no deben enviar formulario
  const cancelButtons = document.querySelectorAll('[data-prevent]');
  cancelButtons.forEach(button => {
    button.addEventListener("click", e => e.preventDefault());
  });

  // Botón login
  const loginLink = document.getElementById('btn-login');
  if (loginLink) {
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = "login.html";
    });
  }

  // Botones de información con SweetAlert
  const infoButtons = document.querySelectorAll('.info-btn');
  infoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const title = button.getAttribute('data-title') || "Información";
      const details = button.getAttribute('data-details') || "Sin detalles";

      Swal.fire({
        title,
        text: details,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        customClass: { confirmButton: 'sw-button' },
        buttonsStyling: false
      });
    });
  });

  // Carousel
  const slides = document.querySelectorAll('.slide');
  let currentIndex = 0;
  function showNextSlide() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }
  setInterval(showNextSlide, 2000);

  // FORM 1 - Contacto
  const form = document.getElementById("formulario");
  const nombre = document.getElementById("name");
  const correo = document.getElementById("email");
  const fecha = document.getElementById("date");
  const mensaje = document.getElementById("message");
  const resultado = document.getElementById("resultado");

  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const nuevoContacto = {
      nombre: nombre.value,
      correo: correo.value,
      fecha: fecha.value,
      mensaje: mensaje.value
    };

    try {
      const res = await fetch(`${API_EVENT}/contactos`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoContacto)
      });

      if (!res.ok) throw new Error("Error en el servidor");

      resultado.textContent = "Éxito al agregar";
      resultado.style.color = "green";
    } catch (error) {
      resultado.textContent = "Error al agregar";
      resultado.style.color = "red";
      Swal.fire("Ups...", error.message, "error");
    }
    form.reset();
  });

  // FORM 2 - Suscripción
  const form2 = document.getElementById("formulario2");
  const correo2 = document.getElementById("email2");

  form2.addEventListener("submit", async function(e) {
    e.preventDefault();
    const suscripcion = { correo: correo2.value };

    try {
      const res = await fetch(`${API_EVENT}/suscripciones`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(suscripcion)
      });

      if (!res.ok) throw new Error("Error en la suscripción");

      resultado.textContent = "Éxito al suscribirse";
      resultado.style.color = "green";
    } catch (error) {
      resultado.textContent = "Error al suscribirse";
      resultado.style.color = "red";
      Swal.fire("Ups...", error.message, "error");
    }
    form2.reset();
  });
});