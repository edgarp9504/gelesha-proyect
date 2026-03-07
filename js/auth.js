/* ══════════════════════════════════════════════════════════
   GELESHA — Autenticación del panel admin
   Requiere: js/env.js cargado antes que este archivo
══════════════════════════════════════════════════════════ */

const AUTH = (() => {
  const SESSION_KEY = 'gelesha_admin_session';

  /* Genera un hash simple (no criptográfico) del string */
  function hashStr(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString(36);
  }

  function saveSession() {
    const expires = Date.now() + ENV.sessionHours * 3600 * 1000;
    const token   = hashStr(ENV.user + ENV.pass + expires.toString().slice(0, 8));
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token, expires }));
  }

  function isLoggedIn() {
    try {
      const raw  = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const { token, expires } = JSON.parse(raw);
      if (Date.now() > expires) { sessionStorage.removeItem(SESSION_KEY); return false; }
      const expected = hashStr(ENV.user + ENV.pass + expires.toString().slice(0, 8));
      return token === expected;
    } catch { return false; }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  /* Intento de login — devuelve true/false */
  function attempt(user, pass) {
    if (user.trim() === ENV.user && pass === ENV.pass) {
      saveSession();
      return true;
    }
    return false;
  }

  return { isLoggedIn, attempt, logout };
})();
