/* ================================================================
   Módulo: Carousel
   Carrusel de imágenes con autoplay, swipe táctil y accesibilidad.
   ================================================================ */

const Carousel = (function () {

  /* — Estado privado — */
  let slides      = [];
  let dots        = [];
  let prevBtn     = null;
  let nextBtn     = null;
  let current     = 0;
  let timer       = null;
  let isAnimating = false;

  const INTERVAL    = 5500;   // ms entre cambios automáticos
  const SWIPE_MIN   = 50;     // px mínimos para reconocer un swipe

  /* — Navegar a un índice específico — */
  function goTo(index) {
    if (isAnimating || index === current) return;
    isAnimating = true;

    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');

    /* Desbloquear después de la transición CSS (1 s) */
    setTimeout(() => { isAnimating = false; }, 1000);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* — Autoplay — */
  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, INTERVAL);
  }

  function stopAutoplay() {
    clearInterval(timer);
    timer = null;
  }

  /* — Soporte táctil (swipe) — */
  function bindSwipe(el) {
    let startX = 0;
    let startY = 0;

    el.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchend', function (e) {
      const dx = startX - e.changedTouches[0].clientX;
      const dy = startY - e.changedTouches[0].clientY;

      /* Solo procesar si el movimiento es predominantemente horizontal */
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_MIN) {
        dx > 0 ? next() : prev();
        startAutoplay();
      }
    }, { passive: true });
  }

  /* — Navegación por teclado — */
  function bindKeyboard(el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { prev(); startAutoplay(); }
      if (e.key === 'ArrowRight') { next(); startAutoplay(); }
    });
  }

  /* — Inicialización — */
  function init() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    slides  = Array.from(carousel.querySelectorAll('.slide'));
    dots    = Array.from(carousel.querySelectorAll('.dot'));
    prevBtn = document.getElementById('prev');
    nextBtn = document.getElementById('next');

    if (!slides.length) return;

    /* Asegurar que el primer slide esté activo */
    slides[0].classList.add('active');
    if (dots.length) {
      dots[0].classList.add('active');
      dots[0].setAttribute('aria-selected', 'true');
    }

    /* Eventos de flechas */
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAutoplay(); });

    /* Eventos de dots */
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); startAutoplay(); });
    });

    /* Pausar al pasar el cursor por encima */
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    /* Pausar cuando la pestaña pierde foco */
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stopAutoplay() : startAutoplay();
    });

    bindSwipe(carousel);
    bindKeyboard(carousel);

    startAutoplay();
  }

  /* — API pública — */
  return { init: init, next: next, prev: prev, goTo: goTo };

})();
