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

  /* — Contador regresivo: Congreso KABOD (15 Mayo 2026, 6:00 PM) — */
  (function () {
    var target    = new Date('2026-05-15T18:00:00');
    var container = document.getElementById('kabodCountdown');
    var cdDias    = document.getElementById('cdDias');
    var cdHoras   = document.getElementById('cdHoras');
    var cdMinutos = document.getElementById('cdMinutos');
    var cdSegundos= document.getElementById('cdSegundos');
    if (!container || !cdDias) return;

    function tick() {
      var diff = target - new Date();
      if (diff <= 0) {
        container.innerHTML = '<p class="countdown-terminado">¡El Congreso KABOD ha comenzado! 🙌</p>';
        return;
      }
      cdDias.textContent     = String(Math.floor(diff / 86400000)).padStart(2, '0');
      cdHoras.textContent    = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
      cdMinutos.textContent  = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      cdSegundos.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* — Formulario: Primera Visita — */
  const visitForm = document.getElementById('visitForm');
  if (visitForm) {
    visitForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const nombre   = visitForm.querySelector('[name="nombre"]').value.trim();
      const telefono = visitForm.querySelector('[name="telefono"]').value.trim();
      const fecha    = visitForm.querySelector('[name="fecha"]').value;
      if (!nombre) {
        alert('Por favor escribe tu nombre.');
        return;
      }
      try {
        await window.guardarVisita({ nombre, telefono, fecha });
        alert('¡Gracias, ' + nombre + '! Nos alegra que planees visitarnos. Que Dios te bendiga.');
        visitForm.reset();
      } catch (err) {
        alert('No se pudo guardar. Verifica tu conexión e inténtalo de nuevo.');
      }
    });
  }

  /* — Formulario: Petición de Oración — */
  const prayerForm = document.getElementById('prayerForm');
  if (prayerForm) {
    prayerForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const nombre   = prayerForm.querySelector('[name="nombreOracion"]').value.trim();
      const peticion = prayerForm.querySelector('[name="peticion"]').value.trim();
      if (!peticion) {
        alert('Por favor escribe tu petición.');
        return;
      }
      try {
        await window.guardarOracion({ nombre, peticion });
        alert('Tu petición ha sido recibida. Estaremos orando por ti. ¡Dios te bendiga!');
        prayerForm.reset();
      } catch (err) {
        alert('No se pudo guardar. Verifica tu conexión e inténtalo de nuevo.');
      }
    });
  }

});
