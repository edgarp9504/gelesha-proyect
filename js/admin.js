/* ══════════════════════════════════════════════════════════
   GELESHA — Admin Panel JavaScript
   Módulos: Auth · Dashboard · Agenda · Ventas · Reportes
══════════════════════════════════════════════════════════ */

/* ── INICIALIZACIÓN DE AUTH ─────────────────────────────── */
async function initAuth() {
  await ENV.load();   // Lee .env

  const loginScreen = document.getElementById('loginScreen');
  const adminWrap   = document.getElementById('adminMain');
  const sidebar     = document.getElementById('sidebar');

  function showPanel() {
    loginScreen.classList.add('hidden');
    adminWrap.style.visibility  = 'visible';
    sidebar.style.visibility    = 'visible';
    renderDashboard();
  }

  function showLogin() {
    loginScreen.classList.remove('hidden');
    adminWrap.style.visibility  = 'hidden';
    sidebar.style.visibility    = 'hidden';
  }

  // ¿Ya tiene sesión válida?
  if (AUTH.isLoggedIn()) {
    showPanel();
  } else {
    showLogin();
  }

  // Formulario de login
  const form     = document.getElementById('loginForm');
  const errorEl  = document.getElementById('loginError');
  const loginBtn = document.getElementById('loginBtn');

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;

    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verificando…';

    // Pequeño delay para evitar brute-force visual
    await new Promise(r => setTimeout(r, 600));

    if (AUTH.attempt(user, pass)) {
      errorEl.classList.remove('show');
      showPanel();
    } else {
      errorEl.classList.add('show');
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 450);
      document.getElementById('loginPass').value = '';
      document.getElementById('loginPass').focus();
    }

    loginBtn.disabled = false;
    loginBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Entrar al panel';
  });

  // Toggle mostrar contraseña
  document.getElementById('togglePass')?.addEventListener('click', () => {
    const input = document.getElementById('loginPass');
    const icon  = document.getElementById('togglePassIcon');
    const show  = input.type === 'password';
    input.type  = show ? 'text' : 'password';
    icon.className = show ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
  });

  // Botón cerrar sesión
  document.getElementById('btnLogout')?.addEventListener('click', () => {
    if (confirm('¿Cerrar sesión del panel admin?')) {
      AUTH.logout();
      showLogin();
      document.getElementById('loginUser').value = '';
      document.getElementById('loginPass').value = '';
    }
  });
}

/* ── ESTADO GLOBAL ──────────────────────────────────────── */
let allCitas  = [];
let allVentas = [];
let citasPage = 1;
let ventasPage = 1;
const PAGE_SIZE = 15;

let chartVentas7d   = null;
let chartTopSrv     = null;
let chartDias       = null;
let chartCat        = null;
let chartMetodo     = null;

/* ── CATÁLOGO (compartido) ─────────────────────────────── */
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

/* ── FORMATTERS ─────────────────────────────────────────── */
const fmt = n => `$${Number(n).toLocaleString('es-MX',{minimumFractionDigits:0})}`;

function fmtDate(str) {
  if (!str) return '—';
  const [y,m,d] = str.split('-');
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${parseInt(d)} ${months[parseInt(m)-1]} ${y}`;
}

function todayStr() { return new Date().toISOString().slice(0,10); }

/* ── TOAST ──────────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = `toast toast--${type} show`;
  setTimeout(() => t.className = 'toast', 3500);
}

/* ── MODAL ──────────────────────────────────────────────── */
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

/* ── VIEW SWITCHING ─────────────────────────────────────── */
const VIEW_TITLES = {
  dashboard: 'Dashboard',
  agenda:    'Agenda / Citas',
  ventas:    'Ventas / Cobros',
  reportes:  'Reportes de Ventas',
};

function switchView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.sn-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`view-${name}`)?.classList.add('active');
  document.querySelector(`[data-view="${name}"]`)?.classList.add('active');
  document.getElementById('topbarTitle').textContent = VIEW_TITLES[name] || name;

  // Close sidebar on mobile
  document.getElementById('sidebar')?.classList.remove('open');

  if (name === 'dashboard') renderDashboard();
  if (name === 'agenda')    renderCitas();
  if (name === 'ventas')    renderVentas();
  if (name === 'reportes')  renderReportes();
}

/* ── POPULATE SERVICE SELECTS ───────────────────────────── */
function populateServiceSelects() {
  ['citaServicio', 'ventaServicio'].forEach(selId => {
    const sel = document.getElementById(selId);
    if (!sel) return;
    sel.innerHTML = '<option value="" disabled selected>Selecciona servicio</option>';
    const bycat = {};
    CATALOGO.forEach(s => { if (!bycat[s.cat]) bycat[s.cat] = []; bycat[s.cat].push(s); });
    const labels = {
      Masaje:'Masajes', Facial:'Faciales', Aparatologia:'Aparatología',
      Reductivo:'Reductivos', Depilacion:'Depilación', Otros:'Otros'
    };
    Object.entries(bycat).forEach(([cat, items]) => {
      const og = document.createElement('optgroup');
      og.label = labels[cat] || cat;
      items.forEach(s => {
        const op = document.createElement('option');
        op.value = s.nombre;
        op.textContent = `${s.nombre} — ${fmt(s.precio)}`;
        op.dataset.precio = s.precio;
        og.appendChild(op);
      });
      sel.appendChild(og);
    });
  });
}

/* ── AUTO-FILL PRICE ON SERVICE SELECT ──────────────────── */
function initServiceAutofill() {
  const sel   = document.getElementById('ventaServicio');
  const input = document.getElementById('ventaMonto');
  if (!sel || !input) return;
  sel.addEventListener('change', () => {
    const opt = sel.options[sel.selectedIndex];
    if (opt?.dataset.precio) input.value = opt.dataset.precio;
  });
}

/* ══════════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════════ */
async function renderDashboard() {
  const [ventasRes, citasRes] = await Promise.all([
    fetch('tables/ventas?limit=500').then(r=>r.json()),
    fetch('tables/citas?limit=500').then(r=>r.json()),
  ]);
  allVentas = ventasRes.data || [];
  allCitas  = citasRes.data  || [];

  const now       = new Date();
  const mesActual = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;

  const ventasMes = allVentas.filter(v => (v.fecha||'').startsWith(mesActual));
  const citasMes  = allCitas.filter(c  => (c.fecha||'').startsWith(mesActual));

  const totalMes = ventasMes.reduce((s,v) => s + Number(v.monto||0), 0);
  const clientas = new Set(allVentas.map(v => (v.cliente||'').toLowerCase().trim())).size;
  const ticket   = allVentas.length ? totalMes / (ventasMes.length || 1) : 0;

  document.getElementById('kpiVentasMes').textContent = fmt(totalMes);
  document.getElementById('kpiCitasMes').textContent  = citasMes.length;
  document.getElementById('kpiClientas').textContent  = clientas;
  document.getElementById('kpiTicket').textContent    = fmt(Math.round(ticket));

  renderChartVentas7d();
  renderChartTopServicios();
  renderProxCitas();
}

function renderChartVentas7d() {
  const labels = [];
  const data   = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const str = d.toISOString().slice(0,10);
    const dias = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    labels.push(dias[d.getDay()]);
    const total = allVentas.filter(v=>v.fecha===str).reduce((s,v)=>s+Number(v.monto||0),0);
    data.push(total);
  }

  const ctx = document.getElementById('chartVentas')?.getContext('2d');
  if (!ctx) return;
  if (chartVentas7d) chartVentas7d.destroy();
  chartVentas7d = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Ventas MXN',
        data,
        backgroundColor: 'rgba(208,140,55,0.75)',
        borderColor: '#D08C37',
        borderWidth: 2,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { callback: v => `$${v/1000}k` } }
      }
    }
  });
}

function renderChartTopServicios() {
  const counts = {};
  allVentas.forEach(v => { if (v.servicio) counts[v.servicio] = (counts[v.servicio]||0)+1; });
  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,6);

  const ctx = document.getElementById('chartServicios')?.getContext('2d');
  if (!ctx) return;
  if (chartTopSrv) chartTopSrv.destroy();
  chartTopSrv = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sorted.map(e=>e[0].split(' ').slice(0,2).join(' ')),
      datasets: [{
        data: sorted.map(e=>e[1]),
        backgroundColor: ['#D08C37','#8B4F8B','#2a9d8f','#c06080','#5b8fd4','#c0804a'],
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'right', labels: { font: { size: 11 } } } }
    }
  });
}

function renderProxCitas() {
  const cont = document.getElementById('proxCitasTable');
  if (!cont) return;
  const today = todayStr();
  const prox  = allCitas
    .filter(c => c.fecha >= today && c.estado !== 'cancelada')
    .sort((a,b) => a.fecha.localeCompare(b.fecha) || (a.hora||'').localeCompare(b.hora||''))
    .slice(0, 8);

  if (!prox.length) {
    cont.innerHTML = '<p style="padding:20px;color:#9e9790;text-align:center;">No hay próximas citas registradas.</p>';
    return;
  }

  cont.innerHTML = `
    <div class="table-wrap">
      <table class="admin-table">
        <thead><tr>
          <th>Clienta</th><th>Servicio</th><th>Fecha</th><th>Hora</th><th>Estado</th>
        </tr></thead>
        <tbody>
          ${prox.map(c=>`
            <tr>
              <td><strong>${esc(c.nombre||c.cliente||'—')}</strong><br><small style="color:#9e9790">${esc(c.telefono||'')}</small></td>
              <td>${esc(c.servicio||'—')}</td>
              <td>${fmtDate(c.fecha)}</td>
              <td>${c.hora||'—'}</td>
              <td><span class="badge-estado estado-${c.estado||'pendiente'}">${c.estado||'pendiente'}</span></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

/* ══════════════════════════════════════════════════════════
   AGENDA / CITAS
══════════════════════════════════════════════════════════ */
let citasFiltered = [];

async function loadCitas() {
  const res = await fetch('tables/citas?limit=500').then(r=>r.json());
  allCitas = res.data || [];
  citasFiltered = [...allCitas];
}

function renderCitas() {
  loadCitas().then(() => {
    applyFiltrosCitas();
  });
}

function applyFiltrosCitas() {
  const fecha   = document.getElementById('agendaFecha')?.value || '';
  const estado  = document.getElementById('agendaEstado')?.value || '';
  const busqueda = document.getElementById('agendaBuscar')?.value?.toLowerCase().trim() || '';

  citasFiltered = allCitas.filter(c => {
    if (fecha   && c.fecha   !== fecha)   return false;
    if (estado  && c.estado  !== estado)  return false;
    if (busqueda) {
      const hay = `${c.nombre||c.cliente||''} ${c.telefono||''} ${c.servicio||''}`.toLowerCase();
      if (!hay.includes(busqueda)) return false;
    }
    return true;
  });

  // Sort by date asc then hora
  citasFiltered.sort((a,b) => {
    const dif = (a.fecha||'').localeCompare(b.fecha||'');
    return dif !== 0 ? dif : (a.hora||'').localeCompare(b.hora||'');
  });

  citasPage = 1;
  paintCitas();
}

function paintCitas() {
  const tbody   = document.getElementById('citasBody');
  const empty   = document.getElementById('citasEmpty');
  const pagCont = document.getElementById('citasPagination');

  const total   = citasFiltered.length;
  const pages   = Math.ceil(total / PAGE_SIZE) || 1;
  citasPage = Math.min(citasPage, pages);
  const slice   = citasFiltered.slice((citasPage-1)*PAGE_SIZE, citasPage*PAGE_SIZE);

  if (!total) {
    tbody.innerHTML = '';
    empty.hidden    = false;
    pagCont.innerHTML = '';
    return;
  }
  empty.hidden = true;

  tbody.innerHTML = slice.map(c => `
    <tr>
      <td>
        <strong>${esc(c.nombre||c.cliente||'—')}</strong>
        <br><small style="color:#9e9790">${esc(c.email||'')}</small>
      </td>
      <td>${esc(c.telefono||'—')}</td>
      <td>${esc(c.servicio||'—')}</td>
      <td>${fmtDate(c.fecha)}</td>
      <td>${c.hora||'—'}</td>
      <td><span class="badge-estado estado-${c.estado||'pendiente'}">${c.estado||'pendiente'}</span></td>
      <td>
        <button class="btn-icon" title="Editar" onclick="editCita('${c.id}')"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-icon" title="Completar" onclick="completarCita('${c.id}')"><i class="fa-solid fa-check"></i></button>
        <button class="btn-icon btn-delete" title="Cancelar" onclick="cancelarCita('${c.id}')"><i class="fa-solid fa-xmark"></i></button>
      </td>
    </tr>`).join('');

  // Pagination
  pagCont.innerHTML = '';
  if (pages > 1) {
    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === citasPage) btn.classList.add('active');
      btn.addEventListener('click', () => { citasPage = i; paintCitas(); });
      pagCont.appendChild(btn);
    }
  }
}

/* ── CITAS CRUD ─────────────────────────────────────────── */
function openNuevaCita() {
  document.getElementById('formCita').reset();
  document.getElementById('citaId').value = '';
  document.getElementById('modalCitaTitulo').textContent = 'Nueva Cita';
  document.getElementById('citaFecha').value = todayStr();
  openModal('modalCita');
}

function editCita(id) {
  const c = allCitas.find(x => x.id === id);
  if (!c) return;
  document.getElementById('citaId').value       = c.id;
  document.getElementById('citaNombre').value   = c.nombre || c.cliente || '';
  document.getElementById('citaTelefono').value = c.telefono || '';
  document.getElementById('citaEmail').value    = c.email || '';
  document.getElementById('citaServicio').value = c.servicio || '';
  document.getElementById('citaFecha').value    = c.fecha || todayStr();
  document.getElementById('citaHora').value     = c.hora || '';
  document.getElementById('citaEstado').value   = c.estado || 'pendiente';
  document.getElementById('citaNotas').value    = c.notas || '';
  document.getElementById('modalCitaTitulo').textContent = 'Editar Cita';
  openModal('modalCita');
}

async function completarCita(id) {
  if (!confirm('¿Marcar esta cita como completada?')) return;
  await fetch(`tables/citas/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: 'completada' })
  });
  showToast('Cita marcada como completada ✅');
  renderCitas();
}

async function cancelarCita(id) {
  if (!confirm('¿Cancelar esta cita?')) return;
  await fetch(`tables/citas/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: 'cancelada' })
  });
  showToast('Cita cancelada', 'error');
  renderCitas();
}

async function saveCita(e) {
  e.preventDefault();
  const id = document.getElementById('citaId').value;
  const data = {
    nombre:   document.getElementById('citaNombre').value.trim(),
    telefono: document.getElementById('citaTelefono').value.trim(),
    email:    document.getElementById('citaEmail')?.value.trim() || '',
    servicio: document.getElementById('citaServicio').value,
    fecha:    document.getElementById('citaFecha').value,
    hora:     document.getElementById('citaHora').value,
    estado:   document.getElementById('citaEstado').value,
    notas:    document.getElementById('citaNotas').value.trim(),
  };

  if (!data.nombre || !data.telefono || !data.servicio || !data.fecha) {
    showToast('Completa los campos obligatorios', 'error'); return;
  }

  const url    = id ? `tables/citas/${id}` : 'tables/citas';
  const method = id ? 'PUT' : 'POST';

  await fetch(url, { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
  closeModal('modalCita');
  showToast(id ? 'Cita actualizada ✅' : 'Cita registrada ✅');
  renderCitas();
}

/* ══════════════════════════════════════════════════════════
   VENTAS / COBROS
══════════════════════════════════════════════════════════ */
let ventasFiltered = [];

async function loadVentas() {
  const res = await fetch('tables/ventas?limit=500').then(r=>r.json());
  allVentas = res.data || [];
  ventasFiltered = [...allVentas];
}

function renderVentas() {
  loadVentas().then(() => {
    applyFiltrosVentas();
  });
}

function applyFiltrosVentas() {
  const desde  = document.getElementById('ventaDesde')?.value || '';
  const hasta  = document.getElementById('ventaHasta')?.value || '';
  const metodo = document.getElementById('ventaMetodo')?.value || '';
  const buscar = document.getElementById('ventaBuscar')?.value?.toLowerCase().trim() || '';

  ventasFiltered = allVentas.filter(v => {
    if (desde  && v.fecha < desde)  return false;
    if (hasta  && v.fecha > hasta)  return false;
    if (metodo && v.metodo !== metodo) return false;
    if (buscar) {
      const hay = `${v.cliente||''} ${v.servicio||''}`.toLowerCase();
      if (!hay.includes(buscar)) return false;
    }
    return true;
  });

  ventasFiltered.sort((a,b) => (b.fecha||'').localeCompare(a.fecha||''));

  // Totales
  let totalF=0, totEfec=0, totTarj=0, totTrans=0;
  ventasFiltered.forEach(v => {
    const m = Number(v.monto||0);
    totalF += m;
    if (v.metodo === 'efectivo')      totEfec  += m;
    if (v.metodo === 'tarjeta')       totTarj  += m;
    if (v.metodo === 'transferencia') totTrans += m;
  });
  document.getElementById('totalFiltrado').textContent    = fmt(totalF);
  document.getElementById('totalEfectivo').textContent    = fmt(totEfec);
  document.getElementById('totalTarjeta').textContent     = fmt(totTarj);
  document.getElementById('totalTransferencia').textContent = fmt(totTrans);

  ventasPage = 1;
  paintVentas();
}

function paintVentas() {
  const tbody   = document.getElementById('ventasBody');
  const empty   = document.getElementById('ventasEmpty');
  const pagCont = document.getElementById('ventasPagination');

  const total = ventasFiltered.length;
  const pages = Math.ceil(total / PAGE_SIZE) || 1;
  ventasPage  = Math.min(ventasPage, pages);
  const slice = ventasFiltered.slice((ventasPage-1)*PAGE_SIZE, ventasPage*PAGE_SIZE);

  const metodoIcons = { efectivo:'💵', tarjeta:'💳', transferencia:'📲' };

  if (!total) {
    tbody.innerHTML = '';
    empty.hidden    = false;
    pagCont.innerHTML = '';
    return;
  }
  empty.hidden = true;

  tbody.innerHTML = slice.map(v => `
    <tr>
      <td>${fmtDate(v.fecha)}</td>
      <td><strong>${esc(v.cliente||'—')}</strong></td>
      <td>${esc(v.servicio||'—')}</td>
      <td><strong style="color:#D08C37">${fmt(v.monto||0)}</strong></td>
      <td>${metodoIcons[v.metodo]||''} ${v.metodo||'—'}</td>
      <td><small>${esc(v.notas||'')}</small></td>
      <td>
        <button class="btn-icon" title="Editar" onclick="editVenta('${v.id}')"><i class="fa-solid fa-pen"></i></button>
        <button class="btn-icon btn-delete" title="Eliminar" onclick="deleteVenta('${v.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>`).join('');

  // Pagination
  pagCont.innerHTML = '';
  if (pages > 1) {
    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === ventasPage) btn.classList.add('active');
      btn.addEventListener('click', () => { ventasPage = i; paintVentas(); });
      pagCont.appendChild(btn);
    }
  }
}

/* ── VENTAS CRUD ─────────────────────────────────────────── */
function openNuevaVenta() {
  document.getElementById('formVenta').reset();
  document.getElementById('ventaId').value = '';
  document.getElementById('modalVentaTitulo').textContent = 'Registrar Venta';
  document.getElementById('ventaFecha').value = todayStr();
  openModal('modalVenta');
}

function editVenta(id) {
  const v = allVentas.find(x => x.id === id);
  if (!v) return;
  document.getElementById('ventaId').value            = v.id;
  document.getElementById('ventaCliente').value       = v.cliente || '';
  document.getElementById('ventaFecha').value         = v.fecha || todayStr();
  document.getElementById('ventaServicio').value      = v.servicio || '';
  document.getElementById('ventaMonto').value         = v.monto || '';
  document.getElementById('ventaMetodoPago').value    = v.metodo || '';
  document.getElementById('ventaNotas').value         = v.notas || '';
  document.getElementById('modalVentaTitulo').textContent = 'Editar Venta';
  openModal('modalVenta');
}

async function deleteVenta(id) {
  if (!confirm('¿Eliminar este registro de venta?')) return;
  await fetch(`tables/ventas/${id}`, { method: 'DELETE' });
  showToast('Venta eliminada', 'error');
  renderVentas();
}

async function saveVenta(e) {
  e.preventDefault();
  const id = document.getElementById('ventaId').value;
  const data = {
    cliente:  document.getElementById('ventaCliente').value.trim(),
    fecha:    document.getElementById('ventaFecha').value,
    servicio: document.getElementById('ventaServicio').value,
    monto:    Number(document.getElementById('ventaMonto').value) || 0,
    metodo:   document.getElementById('ventaMetodoPago').value,
    notas:    document.getElementById('ventaNotas').value.trim(),
    categoria: CATALOGO.find(s=>s.nombre===document.getElementById('ventaServicio').value)?.cat || 'Otros',
  };

  if (!data.cliente || !data.servicio || !data.monto || !data.metodo) {
    showToast('Completa los campos obligatorios', 'error'); return;
  }

  const url    = id ? `tables/ventas/${id}` : 'tables/ventas';
  const method = id ? 'PUT' : 'POST';

  await fetch(url, { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
  closeModal('modalVenta');
  showToast(id ? 'Venta actualizada ✅' : 'Venta registrada ✅');
  renderVentas();
}

/* ══════════════════════════════════════════════════════════
   REPORTES
══════════════════════════════════════════════════════════ */
async function renderReportes() {
  const dias = parseInt(document.getElementById('reportPeriodo')?.value || '30');
  const desde = new Date();
  desde.setDate(desde.getDate() - dias);
  const desdeStr = desde.toISOString().slice(0,10);

  const res = await fetch('tables/ventas?limit=500').then(r=>r.json());
  const ventas = (res.data || []).filter(v => (v.fecha||'') >= desdeStr);

  const total  = ventas.reduce((s,v)=>s+Number(v.monto||0),0);
  const num    = ventas.length;
  const ticket = num ? total/num : 0;

  // Top servicio
  const counts = {};
  ventas.forEach(v => { if (v.servicio) counts[v.servicio]=(counts[v.servicio]||0)+1; });
  const topSrv = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];

  document.getElementById('rTotalVentas').textContent  = fmt(total);
  document.getElementById('rNumTrans').textContent     = num;
  document.getElementById('rTicket').textContent       = fmt(Math.round(ticket));
  document.getElementById('rTopServicio').textContent  = topSrv ? topSrv[0].split(' ').slice(0,3).join(' ') : '—';

  renderChartDias(ventas, dias);
  renderChartCat(ventas);
  renderChartMetodo(ventas);
  renderTopServiciosTable(ventas);
}

function renderChartDias(ventas, dias) {
  const labels = [];
  const data   = [];
  for (let i = dias-1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate()-i);
    const str = d.toISOString().slice(0,10);
    labels.push(str.slice(5));
    data.push(ventas.filter(v=>v.fecha===str).reduce((s,v)=>s+Number(v.monto||0),0));
  }

  // show max 30 labels on x axis
  const showLabels = labels.map((l,i) => (dias <= 30 || i%Math.ceil(dias/30)===0) ? l : '');

  const ctx = document.getElementById('chartReporteDias')?.getContext('2d');
  if (!ctx) return;
  if (chartDias) chartDias.destroy();
  chartDias = new Chart(ctx, {
    type: 'line',
    data: {
      labels: showLabels,
      datasets: [{
        label:'Ventas MXN',
        data,
        borderColor:'#D08C37',
        backgroundColor:'rgba(208,140,55,0.12)',
        borderWidth:2,
        pointRadius:3,
        fill:true,
        tension:0.4,
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      scales:{ y:{ beginAtZero:true, ticks:{ callback:v=>`$${v/1000}k` } } }
    }
  });
}

function renderChartCat(ventas) {
  const bycat = {};
  ventas.forEach(v => {
    const cat = v.categoria || CATALOGO.find(s=>s.nombre===v.servicio)?.cat || 'Otros';
    bycat[cat] = (bycat[cat]||0) + Number(v.monto||0);
  });
  const labels = { Masaje:'Masajes', Facial:'Faciales', Aparatologia:'Aparatología',
                   Reductivo:'Reductivos', Depilacion:'Depilación', Otros:'Otros' };

  const ctx = document.getElementById('chartReporteCat')?.getContext('2d');
  if (!ctx) return;
  if (chartCat) chartCat.destroy();
  chartCat = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(bycat).map(k=>labels[k]||k),
      datasets: [{
        data: Object.values(bycat),
        backgroundColor:['#D08C37','#8B4F8B','#2a9d8f','#c06080','#5b8fd4','#c0804a'],
        borderRadius:6,
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      scales:{ y:{ beginAtZero:true, ticks:{ callback:v=>`$${v/1000}k` } } }
    }
  });
}

function renderChartMetodo(ventas) {
  const metodos = { efectivo:0, tarjeta:0, transferencia:0 };
  ventas.forEach(v => { if (v.metodo in metodos) metodos[v.metodo] += Number(v.monto||0); });

  const ctx = document.getElementById('chartReporteMetodo')?.getContext('2d');
  if (!ctx) return;
  if (chartMetodo) chartMetodo.destroy();
  chartMetodo = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Efectivo','Tarjeta','Transferencia'],
      datasets: [{
        data: Object.values(metodos),
        backgroundColor:['#2a9d8f','#8B4F8B','#D08C37'],
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'right', labels:{ font:{size:12} } } }
    }
  });
}

function renderTopServiciosTable(ventas) {
  const map = {};
  ventas.forEach(v => {
    if (!v.servicio) return;
    if (!map[v.servicio]) map[v.servicio] = { count:0, total:0 };
    map[v.servicio].count++;
    map[v.servicio].total += Number(v.monto||0);
  });
  const sorted = Object.entries(map).sort((a,b)=>b[1].count-a[1].count).slice(0,10);

  const tbody = document.getElementById('topServiciosBody');
  if (!tbody) return;
  tbody.innerHTML = sorted.map((e,i) => `
    <tr>
      <td><strong>${i+1}</strong></td>
      <td>${esc(e[0])}</td>
      <td>${e[1].count}</td>
      <td><strong>${fmt(e[1].total)}</strong></td>
    </tr>`).join('') || '<tr><td colspan="4" style="text-align:center;color:#9e9790;padding:20px">Sin datos en este periodo</td></tr>';
}

/* ══════════════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════════════ */
function esc(str) {
  return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ══════════════════════════════════════════════════════════
   DOM READY
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Date display ── */
  const dateEl = document.getElementById('topbarDate');
  if (dateEl) {
    const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('es-MX', opts);
  }

  /* ── Sidebar nav ── */
  document.querySelectorAll('.sn-link[data-view]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      switchView(link.dataset.view);
    });
  });

  /* ── Sidebar toggle (mobile) ── */
  document.getElementById('sidebarToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('open');
  });

  /* ── Populate service selects ── */
  populateServiceSelects();
  initServiceAutofill();

  /* ── Agenda buttons ── */
  document.getElementById('btnNuevaCita')?.addEventListener('click', openNuevaCita);
  document.getElementById('formCita')?.addEventListener('submit', saveCita);
  document.getElementById('agendaFiltrar')?.addEventListener('click', applyFiltrosCitas);
  document.getElementById('agendaLimpiar')?.addEventListener('click', () => {
    ['agendaFecha','agendaEstado','agendaBuscar'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    applyFiltrosCitas();
  });
  document.getElementById('agendaBuscar')?.addEventListener('input', applyFiltrosCitas);

  /* ── Ventas buttons ── */
  document.getElementById('btnNuevaVenta')?.addEventListener('click', openNuevaVenta);
  document.getElementById('formVenta')?.addEventListener('submit', saveVenta);
  document.getElementById('ventaFiltrar')?.addEventListener('click', applyFiltrosVentas);
  document.getElementById('ventaLimpiar')?.addEventListener('click', () => {
    ['ventaDesde','ventaHasta','ventaMetodo','ventaBuscar'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    applyFiltrosVentas();
  });
  document.getElementById('ventaBuscar')?.addEventListener('input', applyFiltrosVentas);

  /* ── Reportes ── */
  document.getElementById('btnGenerarReporte')?.addEventListener('click', renderReportes);

  /* ── Modal overlay close ── */
  document.querySelectorAll('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
  });

  /* ── Initial view ── */
  // El dashboard se lanza desde initAuth() una vez validada la sesión
  initAuth();

});
