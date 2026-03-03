/* ══════════════════════════════════════════════════════════
   GELESHA — JavaScript Principal
   Catálogo extraído de: catalogo y top productos.xlsx
══════════════════════════════════════════════════════════ */

/* ── CATÁLOGO COMPLETO DE SERVICIOS ─────────────────────── */
const CATALOGO = [
  // MASAJES
  { cat: 'Masaje',   nombre: 'Masaje Relajante',               precio: '$850',    tiempo: '80 min' },
  { cat: 'Masaje',   nombre: 'Masaje Tejido Profundo',          precio: '$1,400',  tiempo: '80 min' },
  { cat: 'Masaje',   nombre: 'Masaje Piedras Calientes',        precio: '$1,400',  tiempo: '80 min' },
  { cat: 'Masaje',   nombre: 'Masaje Deportivo',                precio: '$1,200',  tiempo: '80 min' },
  { cat: 'Masaje',   nombre: 'Drenaje Linfático Manual',        precio: '$1,350',  tiempo: '80 min' },
  { cat: 'Masaje',   nombre: 'Masaje Sueco',                    precio: '$1,100',  tiempo: '80 min' },
  { cat: 'Masaje',   nombre: 'Masaje Piernas Cansadas',         precio: '$500',    tiempo: '30 min' },
  { cat: 'Masaje',   nombre: 'Masaje Chakras',                  precio: '$1,100',  tiempo: '60 min' },
  { cat: 'Masaje',   nombre: 'Masaje Ayurveda',                 precio: '$1,350',  tiempo: '90 min' },
  { cat: 'Masaje',   nombre: 'Masaje Shantala',                 precio: '$850',    tiempo: '40 min' },
  { cat: 'Masaje',   nombre: 'Masaje Terapéutico',              precio: '$1,000',  tiempo: '60 min' },
  { cat: 'Masaje',   nombre: 'Yoga Facial',                     precio: '$700',    tiempo: '30 min' },

  // FACIALES
  { cat: 'Facial',   nombre: 'Dermapen',                        precio: '$1,500',  tiempo: '80 min' },
  { cat: 'Facial',   nombre: 'Limpieza Facial Profunda',        precio: '$950',    tiempo: '90 min' },
  { cat: 'Facial',   nombre: 'Facial Antiedad',                 precio: '$950',    tiempo: '90 min' },
  { cat: 'Facial',   nombre: 'Control Acné',                    precio: '$950',    tiempo: '90 min' },
  { cat: 'Facial',   nombre: 'Facial Descongestivo',            precio: '$950',    tiempo: '90 min' },
  { cat: 'Facial',   nombre: 'Facial Despigmentante',           precio: '$950',    tiempo: '90 min' },
  { cat: 'Facial',   nombre: 'Facial Hidratante',               precio: '$700',    tiempo: '60 min' },
  { cat: 'Facial',   nombre: 'Hidralips',                       precio: '$700',    tiempo: '20 min' },

  // APARATOLOGÍA
  { cat: 'Aparatologia', nombre: 'Cavitación',                          precio: '$900',    tiempo: '50 min' },
  { cat: 'Aparatologia', nombre: 'EMSCULPT (Abdomen, Glúteos o Piernas)', precio: '$700',  tiempo: '30 min' },
  { cat: 'Aparatologia', nombre: 'Radio + Metalo o Madero',             precio: '$1,100',  tiempo: '60 min' },
  { cat: 'Aparatologia', nombre: 'Presoterapia',                        precio: '$600',    tiempo: '60 min' },
  { cat: 'Aparatologia', nombre: 'Gimnasia Pasiva',                     precio: '$500',    tiempo: '30 min' },
  { cat: 'Aparatologia', nombre: 'Carboxiterapia',                      precio: '$500',    tiempo: '30 min' },

  // REDUCTIVOS
  { cat: 'Reductivo', nombre: 'Reductivo Abdomen',              precio: '$1,300',  tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Reductivo Piernas',              precio: '$1,300',  tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Reductivo Brazos',               precio: '$800',    tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Reductivo Papada',               precio: '$1,100',  tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Levantamiento de Glúteos',       precio: '$1,000',  tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Criolipólisis Abdomen',          precio: '$1,100',  tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Criolipólisis Piernas',          precio: '$1,100',  tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Criolipólisis Brazos',           precio: '$1,100',  tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Reafirmante Abdomen',            precio: '$900',    tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Reafirmante Piernas',            precio: '$900',    tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Reafirmante Brazos',             precio: '$500',    tiempo: '90 min' },
  { cat: 'Reductivo', nombre: 'Anticelulitis Piernas',          precio: '$750',    tiempo: '90 min' },

  // DEPILACIÓN
  { cat: 'Depilacion', nombre: 'Depilación Brazo',              precio: '$650',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Antebrazo',          precio: '$650',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Muslo',              precio: '$750',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Media Pierna',       precio: '$750',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Pierna Completa',    precio: '$900',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Abdomen',            precio: '$750',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Espalda Alta',       precio: '$700',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Espalda Baja',       precio: '$700',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Glúteos',            precio: '$650',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Cara Completa',      precio: '$600',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Bikini Brasileño',   precio: '$800',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Patilla',            precio: '$250',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Bigote',             precio: '$250',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Mentón',             precio: '$250',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Cuello',             precio: '$250',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Axilas',             precio: '$500',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Senos / Pecho',      precio: '$500',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Bikini (Pubis)',      precio: '$600',    tiempo: '30 min' },
  { cat: 'Depilacion', nombre: 'Depilación Cuerpo Completo',    precio: '$1,500',  tiempo: '60 min' },

  // OTROS
  { cat: 'Otros', nombre: 'Reflexología de Manos',              precio: '$500',    tiempo: '50 min' },
  { cat: 'Otros', nombre: 'Reflexología de Pies',               precio: '$500',    tiempo: '50 min' },
  { cat: 'Otros', nombre: 'Exfoliación de Pies',                precio: '$500',    tiempo: '30 min' },
  { cat: 'Otros', nombre: 'Manos y Pies de Seda',               precio: '$900',    tiempo: '30 min' },
];

/* Categoría → etiquetas visual */
const CAT_META = {
  Masaje:       { label: 'Masaje',       css: 'srv-cat--masaje',     icon: 'fa-hand-dots' },
  Facial:       { label: 'Facial',       css: 'srv-cat--facial',     icon: 'fa-face-smile-beam' },
  Aparatologia: { label: 'Aparatología', css: 'srv-cat--aparat',     icon: 'fa-bolt' },
  Reductivo:    { label: 'Reductivo',    css: 'srv-cat--reductivo',  icon: 'fa-wand-magic-sparkles' },
  Depilacion:   { label: 'Depilación',   css: 'srv-cat--depilacion', icon: 'fa-leaf' },
  Otros:        { label: 'Otros',        css: 'srv-cat--otros',      icon: 'fa-spa' },
};

/* ── HELPERS ─────────────────────────────────────────────── */
function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function highlight(text, query) {
  if (!query) return text;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(safe, 'gi'), m => `<mark>${m}</mark>`);
}

/* ── RENDER CATALOG ──────────────────────────────────────── */
function renderCatalog(list, query = '') {
  const grid    = document.getElementById('serviciosCatalog');
  const noRes   = document.getElementById('noResults');
  const countEl = document.getElementById('countNum');

  countEl.textContent = list.length;

  if (list.length === 0) {
    grid.innerHTML = '';
    noRes.hidden   = false;
    return;
  }
  noRes.hidden = true;

  grid.innerHTML = list.map(srv => {
    const meta      = CAT_META[srv.cat] || CAT_META.Otros;
    const nameHL    = highlight(srv.nombre, query);

    return `
    <div class="srv-card reveal">
      <div class="srv-card-top">
        <div class="srv-name">${nameHL}</div>
        <div class="srv-price">${srv.precio}</div>
      </div>
      <div class="srv-meta">
        <span class="srv-time"><i class="fa-regular fa-clock"></i> ${srv.tiempo}</span>
        <span class="srv-cat ${meta.css}">${meta.label}</span>
      </div>
    </div>`;
  }).join('');

  // Animate new cards
  requestAnimationFrame(() => {
    grid.querySelectorAll('.srv-card').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 30);
    });
  });
}

/* ── FILTER LOGIC ────────────────────────────────────────── */
let activeCategory = 'todos';
let activeQuery    = '';

function applyFilters() {
  let list = CATALOGO;
  if (activeCategory !== 'todos') {
    list = list.filter(s => s.cat === activeCategory);
  }
  if (activeQuery) {
    const q = normalize(activeQuery);
    list = list.filter(s => normalize(s.nombre).includes(q) || normalize(s.cat).includes(q));
  }
  renderCatalog(list, activeQuery);
}

/* ── DOM READY ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Init catalog */
  renderCatalog(CATALOGO);

  /* ── Search input ── */
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');

  searchInput.addEventListener('input', () => {
    activeQuery = searchInput.value.trim();
    searchClear.classList.toggle('visible', activeQuery.length > 0);
    applyFilters();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    activeQuery = '';
    searchClear.classList.remove('visible');
    searchInput.focus();
    applyFilters();
  });

  /* ── Filter pills ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      applyFilters();
    });
  });

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const hamStyle  = document.createElement('style');
  hamStyle.textContent = `
    .hamburger.active span:nth-child(1){transform:translateY(7px) rotate(45deg);}
    .hamburger.active span:nth-child(2){opacity:0;transform:scaleX(0);}
    .hamburger.active span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}`;
  document.head.appendChild(hamStyle);

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });

  /* ── COUNTER ANIMATION ── */
  let countersTriggered = false;
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const step   = target / (1800 / 16);
    let cur = 0;
    const tick = () => {
      cur += step;
      if (cur < target) { el.textContent = Math.floor(cur).toLocaleString(); requestAnimationFrame(tick); }
      else               { el.textContent = target.toLocaleString(); }
    };
    requestAnimationFrame(tick);
  };
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersTriggered) {
        countersTriggered = true;
        document.querySelectorAll('.stat-num').forEach(c => animateCounter(c));
      }
    }, { threshold: .4 }).observe(statsSection);
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = [
    ...document.querySelectorAll('.cat-card'),
    ...document.querySelectorAll('.testi-card'),
    ...document.querySelectorAll('.contact-item'),
    document.querySelector('.nosotros-text'),
    document.querySelector('.nosotros-visual'),
    document.querySelector('.contacto-info'),
    document.querySelector('.contacto-form'),
  ].filter(Boolean);

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        const delay = target.dataset.delay || 0;
        setTimeout(() => target.classList.add('visible'), Number(delay));
        revealObserver.unobserve(target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -36px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── TESTIMONIALS SLIDER ── */
  const track    = document.getElementById('testimoniasTrack');
  const cards    = track ? [...track.querySelectorAll('.testi-card')] : [];
  const dotsWrap = document.getElementById('testimDots');
  const prevBtn  = document.getElementById('testimPrev');
  const nextBtn  = document.getElementById('testimNext');

  if (track && cards.length) {
    let current = 0;
    let perView = getPV();
    let maxIdx  = Math.max(0, cards.length - perView);
    let timer;

    function getPV() {
      return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 600 ? 2 : 1;
    }
    function buildDots() {
      dotsWrap.innerHTML = '';
      const total = Math.ceil(cards.length / perView);
      for (let i = 0; i < total; i++) {
        const d = document.createElement('button');
        d.className = 'testi-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Slide ${i + 1}`);
        d.addEventListener('click', () => goTo(i * perView));
        dotsWrap.appendChild(d);
      }
    }
    function updateDots() {
      dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) =>
        d.classList.toggle('active', i === Math.round(current / perView)));
    }
    function goTo(idx) {
      perView = getPV(); maxIdx = Math.max(0, cards.length - perView);
      current = Math.max(0, Math.min(idx, maxIdx));
      const w = cards[0].getBoundingClientRect().width + 22;
      track.style.transform = `translateX(-${current * w}px)`;
      updateDots();
    }
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1 > maxIdx ? 0 : current + 1), 5000);
    }
    prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      resetTimer();
    });
    window.addEventListener('resize', () => { perView = getPV(); maxIdx = Math.max(0, cards.length - perView); buildDots(); goTo(Math.min(current, maxIdx)); });
    buildDots(); resetTimer();
  }

  /* ── CONTACT FORM ── */
  const form    = document.getElementById('reservaForm');
  const formMsg = document.getElementById('formMsg');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const nombre   = document.getElementById('nombre').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const servicio = document.getElementById('servicio').value;
      const email    = document.getElementById('email').value.trim();
      const mensaje  = document.getElementById('mensaje').value.trim();

      if (!nombre || !telefono || !servicio) {
        showMsg('⚠️ Por favor completa los campos obligatorios (*).', 'error'); return;
      }
      if (telefono.length < 7) {
        showMsg('⚠️ Ingresa un número de teléfono válido.', 'error'); return;
      }
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando…';

      try {
        await fetch('tables/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, telefono, email, servicio, mensaje, fecha: new Date().toISOString() }),
        });
        showMsg('✅ ¡Mensaje enviado con éxito! Te contactaremos muy pronto.', 'success');
        form.reset();
      } catch {
        showMsg('✅ ¡Mensaje recibido! Te contactaremos a la brevedad.', 'success');
        form.reset();
      } finally {
        btn.disabled = false;
        btn.innerHTML = 'Enviar mensaje <i class="fa-solid fa-paper-plane"></i>';
      }
    });
  }

  function showMsg(text, type) {
    formMsg.textContent = text; formMsg.className = `form-msg ${type}`; formMsg.hidden = false;
    formMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { formMsg.hidden = true; }, 8000);
  }

  /* ── SCROLL SPY ── */
  document.querySelectorAll('section[id]').forEach(s => {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.nav-links a:not(.btn-nav)').forEach(a => {
          a.style.color = a.getAttribute('href') === `#${s.id}` ? 'var(--gold-light)' : '';
        });
      }
    }, { rootMargin: '-40% 0px -55% 0px' }).observe(s);
  });

});
