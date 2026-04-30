/* ================================================================
   Módulo: Cells — Buscador de Células / Casas de Paz
   ================================================================
   IMPORTANTE: Actualiza el arreglo `celulas` con las coordenadas
   reales (lat, lng), direcciones, líderes y días de reunión de
   cada célula de la congregación.
   ================================================================ */

const Cells = (function () {

  /* — Datos de las células (coordenadas aproximadas de El Dorado, Sinaloa) —
     Reemplaza cada entrada con la información real de tu iglesia. */
  var celulas = [
    {
      nombre:    'Casa de Paz — Sector Norte',
      lider:     'Por confirmar',
      direccion: 'Sector Norte, El Dorado, Sinaloa',
      dia:       'Jueves · 7:00 PM',
      lat:       24.3135,
      lng:       -107.3820,
      palabrasClave: ['norte', 'infonavit norte', 'sector norte', 'hidalgo']
    },
    {
      nombre:    'Casa de Paz — Centro',
      lider:     'Por confirmar',
      direccion: 'Centro, El Dorado, Sinaloa',
      dia:       'Miércoles · 7:00 PM',
      lat:       24.3044,
      lng:       -107.3844,
      palabrasClave: ['centro', 'zócalo', 'plaza', 'principal', 'downtown']
    },
    {
      nombre:    'Casa de Paz — Sector Sur',
      lider:     'Por confirmar',
      direccion: 'Sector Sur, El Dorado, Sinaloa',
      dia:       'Viernes · 7:00 PM',
      lat:       24.2960,
      lng:       -107.3855,
      palabrasClave: ['sur', 'sector sur', 'colonia sur', 'col. sur']
    },
    {
      nombre:    'Casa de Paz — Oriente',
      lider:     'Por confirmar',
      direccion: 'Colonia Oriente, El Dorado, Sinaloa',
      dia:       'Martes · 7:00 PM',
      lat:       24.3050,
      lng:       -107.3750,
      palabrasClave: ['oriente', 'este', 'colonia oriente']
    },
    {
      nombre:    'Casa de Paz — Poniente',
      lider:     'Por confirmar',
      direccion: 'Colonia Poniente, El Dorado, Sinaloa',
      dia:       'Jueves · 7:00 PM',
      lat:       24.3040,
      lng:       -107.3950,
      palabrasClave: ['poniente', 'oeste', 'colonia poniente']
    },
    {
      nombre:    'Célula Juvenil',
      lider:     'Por confirmar',
      direccion: 'IAFCJ El Dorado — Frente al IMSS',
      dia:       'Jueves · 6:00 PM',
      lat:       24.3044,
      lng:       -107.3844,
      palabrasClave: ['juvenil', 'jóvenes', 'jovenes', 'iglesia', 'imss']
    }
  ];

  /* — Distancia en km entre dos coordenadas (Haversine) — */
  function distanciaKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  /* — Devuelve la célula más cercana a unas coordenadas — */
  function masCercana(lat, lng) {
    var mejor  = null;
    var minDst = Infinity;
    celulas.forEach(function (c) {
      var d = distanciaKm(lat, lng, c.lat, c.lng);
      if (d < minDst) { minDst = d; mejor = c; }
    });
    return { celula: mejor, km: minDst };
  }

  /* — Renderiza el resultado — */
  function mostrar(celula, km, sugerida) {
    var el = document.getElementById('celulaResult');
    if (!el) return;

    var distTxt = km !== null
      ? (km < 1 ? (Math.round(km * 1000) + ' m de distancia') : (km.toFixed(1) + ' km de distancia'))
      : '';

    var aviso = sugerida
      ? '<p class="celula-error" style="margin-bottom:.75rem;">No encontramos tu colonia exacta. Te sugerimos esta célula.</p>'
      : '';

    el.innerHTML =
      '<div class="celula-card">' +
        aviso +
        (distTxt ? '<span class="celula-distancia">' + distTxt + '</span>' : '') +
        '<h4>' + celula.nombre + '</h4>' +
        '<ul>' +
          '<li>📍&nbsp; ' + celula.direccion + '</li>' +
          '<li>📅&nbsp; ' + celula.dia + '</li>' +
          '<li>👤&nbsp; Líder: ' + celula.lider + '</li>' +
        '</ul>' +
      '</div>';
  }

  function mostrarError(msg) {
    var el = document.getElementById('celulaResult');
    if (el) el.innerHTML = '<p class="celula-error">' + msg + '</p>';
  }

  /* — Búsqueda por texto (colonia / sector) — */
  function buscarPorTexto(texto) {
    var q = (texto || '').toLowerCase().trim();
    if (!q) { mostrarError('Por favor escribe tu colonia o sector.'); return; }

    for (var i = 0; i < celulas.length; i++) {
      var c = celulas[i];
      for (var j = 0; j < c.palabrasClave.length; j++) {
        var kw = c.palabrasClave[j];
        if (q.indexOf(kw) !== -1 || kw.indexOf(q) !== -1) {
          mostrar(c, null, false);
          return;
        }
      }
    }

    /* Sin coincidencia exacta → sugerir la del centro */
    var centro = celulas.find(function (c) { return c.nombre.indexOf('Centro') !== -1; });
    mostrar(centro || celulas[0], null, true);
  }

  /* — Inicialización — */
  function init() {
    var btnGeo    = document.getElementById('btnGeolocate');
    var btnBuscar = document.getElementById('btnBuscarCelula');
    var inputCol  = document.getElementById('inputColonia');

    if (btnGeo) {
      btnGeo.addEventListener('click', function () {
        if (!navigator.geolocation) {
          mostrarError('Tu navegador no soporta geolocalización. Escribe tu colonia abajo.');
          return;
        }
        btnGeo.textContent = '📍  Obteniendo ubicación…';
        btnGeo.disabled = true;

        navigator.geolocation.getCurrentPosition(
          function (pos) {
            btnGeo.textContent = '📍  Usar mi ubicación actual';
            btnGeo.disabled = false;
            var res = masCercana(pos.coords.latitude, pos.coords.longitude);
            mostrar(res.celula, res.km, false);
          },
          function () {
            btnGeo.textContent = '📍  Usar mi ubicación actual';
            btnGeo.disabled = false;
            mostrarError('No se pudo obtener tu ubicación. Escribe tu colonia en el campo de abajo.');
          }
        );
      });
    }

    if (btnBuscar) {
      btnBuscar.addEventListener('click', function () {
        buscarPorTexto(inputCol ? inputCol.value : '');
      });
    }

    if (inputCol) {
      inputCol.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') buscarPorTexto(inputCol.value);
      });
    }
  }

  return { init: init };

})();
