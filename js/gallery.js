/* ================================================================
   Módulo: Gallery — Lightbox para galería de fotos
   ================================================================ */

const Gallery = (function () {

  let images  = [];
  let current = 0;

  function init() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    items.forEach(function (item, i) {
      const img = item.querySelector('img');
      if (img) images.push({ src: img.src, alt: img.alt });
      item.addEventListener('click', function () { open(i); });
    });

    const lb      = document.getElementById('lightbox');
    const btnClose = document.getElementById('lightboxClose');
    const btnPrev  = document.getElementById('lightboxPrev');
    const btnNext  = document.getElementById('lightboxNext');

    if (!lb) return;

    /* Cerrar al hacer clic en el fondo oscuro */
    lb.addEventListener('click', function (e) {
      if (e.target === lb) close();
    });

    if (btnClose) btnClose.addEventListener('click', close);

    if (btnPrev) {
      btnPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        navigate(-1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', function (e) {
        e.stopPropagation();
        navigate(1);
      });
    }

    /* Teclado */
    document.addEventListener('keydown', function (e) {
      const lb = document.getElementById('lightbox');
      if (!lb || !lb.classList.contains('active')) return;
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowLeft')   navigate(-1);
      if (e.key === 'ArrowRight')  navigate(1);
    });
  }

  function open(index) {
    current = index;
    const lb  = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (!lb || !img || !images[index]) return;
    img.src = images[index].src;
    img.alt = images[index].alt;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    current = (current + dir + images.length) % images.length;
    const img = document.getElementById('lightboxImg');
    if (!img) return;
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    setTimeout(function () {
      img.src = images[current].src;
      img.alt = images[current].alt;
      img.style.opacity   = '1';
      img.style.transform = 'scale(1)';
    }, 160);
  }

  return { init: init };

})();
