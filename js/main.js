/* ================================================================
   Main — Punto de entrada de la aplicación IAFCJ El Dorado.
   Inicializa todos los módulos una vez que el DOM esté listo.
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

  Navigation.init();
  Carousel.init();
  Animations.init();
  Gallery.init();
  Cells.init();

  /* — Formulario: Primera Visita — */
  const visitForm = document.getElementById('visitForm');
  if (visitForm) {
    visitForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = visitForm.querySelector('[name="nombre"]').value.trim();
      if (!nombre) {
        alert('Por favor escribe tu nombre.');
        return;
      }
      alert('¡Gracias, ' + nombre + '! Nos alegra que planees visitarnos. Que Dios te bendiga.');
      visitForm.reset();
    });
  }

  /* — Formulario: Petición de Oración — */
  const prayerForm = document.getElementById('prayerForm');
  if (prayerForm) {
    prayerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const peticion = prayerForm.querySelector('[name="peticion"]').value.trim();
      if (!peticion) {
        alert('Por favor escribe tu petición.');
        return;
      }
      alert('Tu petición ha sido recibida. Estaremos orando por ti. ¡Dios te bendiga!');
      prayerForm.reset();
    });
  }

});
