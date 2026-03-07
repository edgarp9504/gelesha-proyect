/* ══════════════════════════════════════════════════════════
   GELESHA — Cargador de variables de entorno
   Lee .env en runtime. Las credenciales NUNCA se escriben
   directamente en el HTML ni en admin.js.
══════════════════════════════════════════════════════════ */

const ENV = (() => {
  // Valores por defecto vacíos — se rellenan al cargar .env
  let _user = '';
  let _pass = '';
  let _sessionHours = 168;

  async function load() {
    try {
      const res  = await fetch('.env?_=' + Date.now());
      const text = await res.text();
      text.split('\n').forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('#')) return;
        const [key, ...rest] = line.split('=');
        const val = rest.join('=').trim();
        if (key === 'ADMIN_USER')    _user         = val;
        if (key === 'ADMIN_PASS')    _pass         = val;
        if (key === 'SESSION_HOURS') _sessionHours = parseInt(val) || 168;
      });
    } catch (e) {
      console.warn('[ENV] No se pudo leer .env — usando valores de respaldo.');
    }
  }

  return {
    load,
    get user()         { return _user; },
    get pass()         { return _pass; },
    get sessionHours() { return _sessionHours; },
  };
})();
