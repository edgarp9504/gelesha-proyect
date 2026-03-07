/* ══════════════════════════════════════════════════════════
   GELESHA — JS Compartido (shared.js)
   Catálogo, utilidades, sidebar, toast
══════════════════════════════════════════════════════════ */

/* ── CATÁLOGO COMPLETO ──────────────────────────────────── */
const CATALOGO = [
  { id:'s01',  cat:'Masaje',       nombre:'Masaje Relajante',                 precio:850,   tiempo:'80 min' },
  { id:'s02',  cat:'Masaje',       nombre:'Masaje Tejido Profundo',           precio:1400,  tiempo:'80 min' },
  { id:'s03',  cat:'Masaje',       nombre:'Masaje Piedras Calientes',         precio:1400,  tiempo:'80 min' },
  { id:'s04',  cat:'Masaje',       nombre:'Masaje Deportivo',                 precio:1200,  tiempo:'80 min' },
  { id:'s05',  cat:'Masaje',       nombre:'Drenaje Linfático Manual',         precio:1350,  tiempo:'80 min' },
  { id:'s06',  cat:'Masaje',       nombre:'Masaje Sueco',                     precio:1100,  tiempo:'80 min' },
  { id:'s07',  cat:'Masaje',       nombre:'Masaje Piernas Cansadas',          precio:500,   tiempo:'30 min' },
  { id:'s08',  cat:'Masaje',       nombre:'Masaje Chakras',                   precio:1100,  tiempo:'60 min' },
  { id:'s09',  cat:'Masaje',       nombre:'Masaje Ayurveda',                  precio:1350,  tiempo:'90 min' },
  { id:'s10',  cat:'Masaje',       nombre:'Masaje Shantala',                  precio:850,   tiempo:'40 min' },
  { id:'s11',  cat:'Masaje',       nombre:'Masaje Terapéutico',               precio:1000,  tiempo:'60 min' },
  { id:'s12',  cat:'Masaje',       nombre:'Yoga Facial',                      precio:700,   tiempo:'30 min' },
  { id:'s13',  cat:'Facial',       nombre:'Dermapen',                         precio:1500,  tiempo:'80 min' },
  { id:'s14',  cat:'Facial',       nombre:'Limpieza Facial Profunda',         precio:950,   tiempo:'90 min' },
  { id:'s15',  cat:'Facial',       nombre:'Facial Antiedad',                  precio:950,   tiempo:'90 min' },
  { id:'s16',  cat:'Facial',       nombre:'Control Acné',                     precio:950,   tiempo:'90 min' },
  { id:'s17',  cat:'Facial',       nombre:'Facial Descongestivo',             precio:950,   tiempo:'90 min' },
  { id:'s18',  cat:'Facial',       nombre:'Facial Despigmentante',            precio:950,   tiempo:'90 min' },
  { id:'s19',  cat:'Facial',       nombre:'Facial Hidratante',                precio:700,   tiempo:'60 min' },
  { id:'s20',  cat:'Facial',       nombre:'Hidralips',                        precio:700,   tiempo:'20 min' },
  { id:'s21',  cat:'Aparatologia', nombre:'Cavitación',                       precio:900,   tiempo:'50 min' },
  { id:'s22',  cat:'Aparatologia', nombre:'EMSCULPT (Abd, Glúteos o Piernas)',precio:700,   tiempo:'30 min' },
  { id:'s23',  cat:'Aparatologia', nombre:'Radio + Metalo o Madero',          precio:1100,  tiempo:'60 min' },
  { id:'s24',  cat:'Aparatologia', nombre:'Presoterapia',                     precio:600,   tiempo:'60 min' },
  { id:'s25',  cat:'Aparatologia', nombre:'Gimnasia Pasiva',                  precio:500,   tiempo:'30 min' },
  { id:'s26',  cat:'Aparatologia', nombre:'Carboxiterapia',                   precio:500,   tiempo:'30 min' },
  { id:'s27',  cat:'Reductivo',    nombre:'Reductivo Abdomen',                precio:1300,  tiempo:'90 min' },
  { id:'s28',  cat:'Reductivo',    nombre:'Reductivo Piernas',                precio:1300,  tiempo:'90 min' },
  { id:'s29',  cat:'Reductivo',    nombre:'Reductivo Brazos',                 precio:800,   tiempo:'90 min' },
  { id:'s30',  cat:'Reductivo',    nombre:'Reductivo Papada',                 precio:1100,  tiempo:'90 min' },
  { id:'s31',  cat:'Reductivo',    nombre:'Levantamiento de Glúteos',         precio:1000,  tiempo:'90 min' },
  { id:'s32',  cat:'Reductivo',    nombre:'Criolipólisis Abdomen',            precio:1100,  tiempo:'90 min' },
  { id:'s33',  cat:'Reductivo',    nombre:'Criolipólisis Piernas',            precio:1100,  tiempo:'90 min' },
  { id:'s34',  cat:'Reductivo',    nombre:'Criolipólisis Brazos',             precio:1100,  tiempo:'90 min' },
  { id:'s35',  cat:'Reductivo',    nombre:'Reafirmante Abdomen',              precio:900,   tiempo:'90 min' },
  { id:'s36',  cat:'Reductivo',    nombre:'Reafirmante Piernas',              precio:900,   tiempo:'90 min' },
  { id:'s37',  cat:'Reductivo',    nombre:'Reafirmante Brazos',               precio:500,   tiempo:'90 min' },
  { id:'s38',  cat:'Reductivo',    nombre:'Anticelulitis Piernas',            precio:750,   tiempo:'90 min' },
  { id:'s39',  cat:'Depilacion',   nombre:'Depilación Brazo',                 precio:650,   tiempo:'30 min' },
  { id:'s40',  cat:'Depilacion',   nombre:'Depilación Antebrazo',             precio:650,   tiempo:'30 min' },
  { id:'s41',  cat:'Depilacion',   nombre:'Depilación Muslo',                 precio:750,   tiempo:'30 min' },
  { id:'s42',  cat:'Depilacion',   nombre:'Depilación Media Pierna',          precio:750,   tiempo:'30 min' },
  { id:'s43',  cat:'Depilacion',   nombre:'Depilación Pierna Completa',       precio:900,   tiempo:'30 min' },
  { id:'s44',  cat:'Depilacion',   nombre:'Depilación Abdomen',               precio:750,   tiempo:'30 min' },
  { id:'s45',  cat:'Depilacion',   nombre:'Depilación Espalda Alta',          precio:700,   tiempo:'30 min' },
  { id:'s46',  cat:'Depilacion',   nombre:'Depilación Espalda Baja',          precio:700,   tiempo:'30 min' },
  { id:'s47',  cat:'Depilacion',   nombre:'Depilación Glúteos',               precio:650,   tiempo:'30 min' },
  { id:'s48',  cat:'Depilacion',   nombre:'Depilación Cara Completa',         precio:600,   tiempo:'30 min' },
  { id:'s49',  cat:'Depilacion',   nombre:'Depilación Bikini Brasileño',      precio:800,   tiempo:'30 min' },
  { id:'s50',  cat:'Depilacion',   nombre:'Depilación Patilla',               precio:250,   tiempo:'30 min' },
  { id:'s51',  cat:'Depilacion',   nombre:'Depilación Bigote',                precio:250,   tiempo:'30 min' },
  { id:'s52',  cat:'Depilacion',   nombre:'Depilación Mentón',                precio:250,   tiempo:'30 min' },
  { id:'s53',  cat:'Depilacion',   nombre:'Depilación Cuello',                precio:250,   tiempo:'30 min' },
  { id:'s54',  cat:'Depilacion',   nombre:'Depilación Axilas',                precio:500,   tiempo:'30 min' },
  { id:'s55',  cat:'Depilacion',   nombre:'Depilación Senos / Pecho',         precio:500,   tiempo:'30 min' },
  { id:'s56',  cat:'Depilacion',   nombre:'Depilación Bikini (Pubis)',         precio:600,   tiempo:'30 min' },
  { id:'s57',  cat:'Depilacion',   nombre:'Depilación Cuerpo Completo',       precio:1500,  tiempo:'60 min' },
  { id:'s58',  cat:'Otros',        nombre:'Reflexología de Manos',            precio:500,   tiempo:'50 min' },
  { id:'s59',  cat:'Otros',        nombre:'Reflexología de Pies',             precio:500,   tiempo:'50 min' },
  { id:'s60',  cat:'Otros',        nombre:'Exfoliación de Pies',              precio:500,   tiempo:'30 min' },
  { id:'s61',  cat:'Otros',        nombre:'Manos y Pies de Seda',             precio:900,   tiempo:'30 min' },
];

const CAT_META = {
  Masaje:       { label:'Masajes',       icon:'fa-hand-dots',           color:'purple' },
  Facial:       { label:'Faciales',      icon:'fa-face-smile-beam',     color:'gold'   },
  Aparatologia: { label:'Aparatología',  icon:'fa-bolt',                color:'blue'   },
  Reductivo:    { label:'Reductivos',    icon:'fa-wand-magic-sparkles', color:'green'  },
  Depilacion:   { label:'Depilación',    icon:'fa-leaf',                color:'orange' },
  Otros:        { label:'Otros',         icon:'fa-spa',                 color:'gray'   },
};

/* ── UTILS ──────────────────────────────────────────────── */
const fmt  = n => `$${Number(n).toLocaleString('es-MX', {minimumFractionDigits:0})}`;
const fmtFull = n => `$${Number(n).toLocaleString('es-MX', {minimumFractionDigits:2, maximumFractionDigits:2})}`;
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

function fmtDate(ts) {
  if (!ts) return '—';
  const d = new Date(typeof ts === 'number' ? ts : ts);
  return d.toLocaleDateString('es-MX', {day:'2-digit', month:'short', year:'numeric'});
}
function fmtDateTime(ts) {
  if (!ts) return '—';
  const d = new Date(typeof ts === 'number' ? ts : ts);
  return d.toLocaleString('es-MX', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'});
}
function todayStr() {
  return new Date().toISOString().slice(0,10);
}
function genFolio(prefix, num) {
  return `${prefix}-${String(num).padStart(4,'0')}`;
}

/* ── TOAST ──────────────────────────────────────────────── */
function toast(msg, type = 'default', duration = 4000) {
  let cont = document.getElementById('toast-container');
  if (!cont) { cont = document.createElement('div'); cont.id = 'toast-container'; document.body.appendChild(cont); }
  const icons = { success:'fa-circle-check', error:'fa-circle-exclamation', default:'fa-spa' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fa-solid ${icons[type]||icons.default}"></i><span>${msg}</span>`;
  cont.appendChild(el);
  setTimeout(() => { el.style.opacity='0'; el.style.transform='translateX(20px)'; el.style.transition='.3s'; setTimeout(()=>el.remove(),300); }, duration);
}

/* ── SIDEBAR / MOBILE ───────────────────────────────────── */
function initSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const toggle   = document.getElementById('menuToggle');
  const overlay  = document.getElementById('sidebarOverlay');
  if (!sidebar) return;
  const open  = () => { sidebar.classList.add('open'); overlay.classList.add('show'); };
  const close = () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); };
  if (toggle)  toggle.addEventListener('click', open);
  if (overlay) overlay.addEventListener('click', close);
  // Mark active nav item
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && path.includes(href.replace('.html',''))) a.classList.add('active');
  });
}

/* ── API HELPERS ────────────────────────────────────────── */
async function apiGet(table, params = '') {
  const r = await fetch(`tables/${table}?limit=500${params ? '&'+params : ''}`);
  return r.json();
}
async function apiPost(table, data) {
  const r = await fetch(`tables/${table}`, {
    method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)
  });
  return r.json();
}
async function apiPatch(table, id, data) {
  const r = await fetch(`tables/${table}/${id}`, {
    method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)
  });
  return r.json();
}
async function apiDelete(table, id) {
  await fetch(`tables/${table}/${id}`, { method:'DELETE' });
}

/* ── MODAL HELPERS ──────────────────────────────────────── */
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
function initModalClose() {
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay')?.classList.remove('open');
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initModalClose();
});
