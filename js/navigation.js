/* ================================================================
   Módulo: Navigation
   - Efecto de fondo al hacer scroll (transparente → sólido)
   - Menú hamburguesa para móvil
   - Cierre del menú al hacer clic en un enlace
   ================================================================ */

const Navigation = (function () {

  const SCROLL_THRESHOLD = 60;   /* px desde arriba para activar fondo sólido */

  /* — Efecto scroll en el header — */
  function bindScrollEffect(header) {
    function onScroll() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* Evaluar estado inicial por si la página abre scrolleada */
    onScroll();
  }

  /* — Menú hamburguesa — */
  function bindMobileMenu(toggle, navLinks) {
    if (!toggle || !navLinks) return;

    function closeMenu() {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
      toggle.classList.add('active');
      navLinks.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    /* Cerrar menú al hacer clic en cualquier enlace */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* Cerrar menú al hacer clic fuera */
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        closeMenu();
      }
    });

    /* Cerrar menú con tecla Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* — Resaltar enlace activo según la sección visible — */
  function bindActiveLink() {
    const sections = document.querySelectorAll('main section[id]');
    const links    = document.querySelectorAll('.nav-links a[href^="#"]');

    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (link) { link.classList.remove('nav-active'); });
          const active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
          if (active) active.classList.add('nav-active');
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(function (sec) { observer.observe(sec); });
  }

  /* — Inicialización — */
  function init() {
    const header   = document.getElementById('mainHeader');
    const toggle   = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (header)  bindScrollEffect(header);
    bindMobileMenu(toggle, navLinks);
    bindActiveLink();
  }

  /* API pública */
  return { init: init };

})();
