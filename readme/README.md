# IAFCJ El Dorado — Documentación del Sitio Web

**Iglesia Apostólica de la Fe en Cristo Jesús — El Dorado, Sinaloa**

---

## Estructura del Proyecto

```
IAFCJ ELDORADO/
├── index.html              ← Página principal
├── logo.png                ← Logo oficial de la iglesia
├── imagen1.jpg             ← Foto 1 del carrusel (Celebración Dominical)
├── imagen2.jpg             ← Foto 2 del carrusel (Congreso KABOD)
├── imagen3.jpg             ← Foto 3 del carrusel (Célula Juvenil)
├── pastor.jpg              ← Foto del pastor (agregar cuando se tenga)
├── canto.mp3               ← Audio del ministerio de alabanza (agregar)
│
├── css/
│   └── styles.css          ← Todos los estilos del sitio
│
├── js/
│   ├── navigation.js       ← Módulo: menú, scroll, enlace activo
│   ├── carousel.js         ← Módulo: carrusel con autoplay y swipe
│   ├── animations.js       ← Módulo: animaciones al hacer scroll
│   └── main.js             ← Punto de entrada — inicializa todo
│
└── readme/
    └── README.md           ← Esta documentación
```

---

## Archivos Pendientes de Agregar

| Archivo | Descripción |
|---|---|
| `pastor.jpg` | Foto del pastor para la sección Identidad y Doctrina |
| `canto.mp3` | Audio de alabanza para el Ministerio de Alabanza |
| `foto1.jpg` | Fotos adicionales para la galería (opcional) |

---

## Cómo Personalizar Cada Sección

### Logo
El logo está en `logo.png` en la raíz del proyecto. Si cambias el archivo, usa el mismo nombre para que aparezca automáticamente en el encabezado y el pie de página.

### Carrusel de Imágenes
- Las imágenes se llaman `imagen1.jpg`, `imagen2.jpg`, `imagen3.jpg`.
- Para agregar más slides, copia uno de los bloques `<div class="slide">` en el HTML y actualiza el número en los indicadores `<div id="indicators">`.
- Para cambiar el tiempo entre slides, edita `INTERVAL` en `js/carousel.js` (actualmente 5500 ms).

### Horarios de Reuniones
Edita la lista `.schedule-list` dentro de la sección `#visita` en `index.html`.

### Mapa de Ubicación
En la sección `#visita`, busca el `<iframe>` del mapa y reemplaza el atributo `src=""` con tu URL de Google Maps:
1. Ve a [Google Maps](https://maps.google.com)
2. Busca tu iglesia
3. Haz clic en **Compartir → Insertar un mapa**
4. Copia solo la URL del atributo `src`

### Transmisión en Vivo (YouTube)
En la sección `#multimedia`, busca el `<iframe>` vacío y reemplaza `src=""` con tu URL de YouTube embed:
```
https://www.youtube.com/embed/ID_DE_TU_VIDEO
```
Para transmisiones en vivo agrega `?autoplay=1&mute=1` al final (opcional).

### Redes Sociales
En la sección `#contacto`, actualiza los `href="#"` de Facebook, Instagram y YouTube con las URLs reales de tu iglesia.

### Botón Donar
El botón **Donar** actualmente no hace nada. Para conectar a una pasarela de pago (PayPal, MercadoPago, etc.), edita el elemento `.btn-donar` en el HTML y agrega el atributo `onclick` o `href` correspondiente.

---

## Módulos JavaScript

### `js/navigation.js`
| Función | Descripción |
|---|---|
| `Navigation.init()` | Activa el efecto de fondo al scroll, menú hamburguesa y enlace activo |

**Comportamiento:**
- El encabezado es transparente sobre el carrusel y se vuelve azul oscuro al hacer scroll.
- En pantallas ≤ 960 px aparece un botón hamburguesa para el menú.
- El enlace del menú correspondiente a la sección visible se resalta automáticamente.

---

### `js/carousel.js`
| Función | Descripción |
|---|---|
| `Carousel.init()` | Inicializa el carrusel con todos sus controles |
| `Carousel.next()` | Avanza al siguiente slide |
| `Carousel.prev()` | Retrocede al slide anterior |
| `Carousel.goTo(i)` | Va directamente al slide número `i` |

**Comportamiento:**
- Avance automático cada 5.5 segundos.
- Se pausa al pasar el cursor encima (hover).
- Se pausa si el usuario cambia de pestaña.
- Soporta swipe táctil izquierda/derecha.
- Navegable con las teclas ← → del teclado.
- El efecto Ken Burns (zoom suave) anima la imagen activa.

---

### `js/animations.js`
| Función | Descripción |
|---|---|
| `Animations.init()` | Registra el observer de aparición en scroll |

**Cómo usar en HTML:**
```html
<div data-animate="fade-up">   <!-- Aparece de abajo hacia arriba -->
<div data-animate="fade-left"> <!-- Aparece desde la izquierda -->
<div data-animate="fade-right"><!-- Aparece desde la derecha -->
<div data-animate="zoom-in">   <!-- Aparece con efecto zoom -->

<!-- Retraso escalonado (útil para tarjetas en grid) -->
<div data-animate="fade-up" data-delay="100"> <!-- 0.1s de retraso -->
<div data-animate="fade-up" data-delay="200"> <!-- 0.2s de retraso -->
<div data-animate="fade-up" data-delay="300"> <!-- 0.3s de retraso -->
```

---

### `js/main.js`
Inicializa todos los módulos y maneja el comportamiento básico de los formularios (Primera Visita y Petición de Oración).

---

## Paleta de Colores

| Variable CSS | Valor | Uso |
|---|---|---|
| `--primary` | `#0c1445` | Azul marino oscuro — fondo del nav, encabezados |
| `--primary-light` | `#1e3a8a` | Azul medio — gradientes, hover |
| `--accent` | `#c8a951` | Dorado — líneas decorativas, botones |
| `--accent-light` | `#f0d060` | Dorado claro — texto sobre fondo oscuro |
| `--white` | `#ffffff` | Fondo principal |
| `--light-blue` | `#eef2ff` | Fondo secciones alternas |

---

## Fuentes Tipográficas

- **Cinzel** (Google Fonts) — Encabezados y títulos. Elegante, estilo clásico.
- **Open Sans** (Google Fonts) — Texto de cuerpo. Limpio y legible.

Se cargan desde Google Fonts. Requiere conexión a internet. Para uso offline, descarga las fuentes y actualiza el `@import` en `css/styles.css`.

---

## Responsive / Móvil

| Breakpoint | Comportamiento |
|---|---|
| > 960 px | Menú horizontal completo |
| ≤ 960 px | Menú hamburguesa, columnas en 1 |
| ≤ 600 px | Estilos compactos para pantallas pequeñas |

---

## Mantenimiento

- Para agregar una nueva sección, copia la estructura de una existente en `index.html` y agrega sus estilos en `css/styles.css`.
- Para cambiar el color principal, modifica `--primary` y `--primary-light` en el bloque `:root` al inicio de `css/styles.css`.
- Los comentarios en cada archivo siguen el formato `/* — descripción — */` para facilitar la navegación.

---

*Que Dios bendiga esta obra y que este sitio sea de edificación para su iglesia.*
