/* ================================================================
   Módulo: Animations
   Animaciones de aparición al hacer scroll con IntersectionObserver.
   Cada elemento con [data-animate] y [data-delay] se anima
   suavemente cuando entra al viewport.
   ================================================================ */

const Animations = (function () {

  /* Umbral y margen del observador */
  const THRESHOLD   = 0.14;
  const ROOT_MARGIN = '0px 0px -60px 0px';

  function createObserver() {
    return new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          /* Una vez animado, dejamos de observarlo */
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold:  THRESHOLD,
      rootMargin: ROOT_MARGIN
    });
  }

  /* Referencia al observador (necesaria para unobserve dentro del callback) */
  let observer;

  function init() {
    /* Si el navegador no soporta IntersectionObserver, mostrar todo */
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-animate]').forEach(function (el) {
        el.classList.add('animated');
      });
      return;
    }

    observer = createObserver();

    document.querySelectorAll('[data-animate]').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* API pública */
  return { init: init };

})();
