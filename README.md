# GELESHA Spa — Sitio Web Completo

**Spa · Estética Corporal y Facial | México**

Sitio web estático completo con catálogo de servicios, flujo de agendado interactivo, y panel de administración con agenda, ventas y reportes.

---

## 🗂️ Estructura de archivos

```
index.html          → Página principal (hero, estadísticas, categorías, testimonios, CTA)
servicios.html      → Catálogo estilo menú con búsqueda y filtros por categoría
servicio.html       → Detalle de servicio + modal de agendado 4 pasos
nosotros.html       → Historia, valores y equipo
contacto.html       → Formulario de contacto
app.html            → Panel de administración (requiere login)

css/style.css       → Estilos globales + variables de marca
js/main.js          → Catálogo, filtros, formulario de reservas (index/servicios)
js/shared.js        → Catálogo compartido, helpers, API wrappers
js/admin.js         → Lógica completa del panel admin
.env                → Variables de entorno (credenciales admin)
```

---

## ✅ Funcionalidades implementadas

### Sitio público
- [x] Página principal con hero, estadísticas y CTA WhatsApp
- [x] Catálogo completo de 61 servicios con búsqueda en tiempo real
- [x] Filtros por categoría (Masajes, Faciales, Aparatología, Reductivos, Depilación, Otros)
- [x] Página de detalle de cada servicio (`servicio.html?id=sXX`)
  - Descripción completa, beneficios, pasos del proceso, etiquetas
  - Servicios relacionados de la misma categoría
  - Tarjeta flotante con precio y duración
- [x] **Flujo de agendado 4 pasos (sin validaciones de calendario real)**:
  1. **Fecha** — Calendario visual, inhabilita domingos y días pasados
  2. **Hora** — Slots de 30 min de 9:00am a 5:00pm (mañana / tarde)
  3. **Datos** — Nombre, teléfono, email y notas
  4. **Confirmar** — Resumen antes de enviar
  - Cita guardada en tabla `citas` al confirmar
- [x] Botón flotante de WhatsApp en todas las páginas
- [x] Diseño responsive (mobile-first)

### Panel de administración (`/app.html` o `/admin`)
- [x] **Login** protegido (usuario: `geleshaadmin`, contraseña en `.env`)
  - Token con expiración en `sessionStorage`
  - Botón de logout en topbar
  - Acceso solo por URL directa (sin enlace público)
- [x] **Dashboard** — KPIs mensuales, gráficas de ventas y servicios top
- [x] **Agenda/Citas** — CRUD completo, filtros por fecha y estado, paginación
- [x] **Ventas/Cobros** — Registro de ventas, totales por método de pago
- [x] **Reportes** — Gráficas por día, categoría, método de pago; top 10 servicios

---

## 🔗 URIs del sitio

| Ruta | Descripción |
|------|-------------|
| `index.html` | Página principal |
| `servicios.html` | Catálogo completo |
| `servicios.html?cat=Masaje` | Catálogo filtrado por categoría |
| `servicio.html?id=s01` | Detalle servicio (s01–s61) |
| `nosotros.html` | Página nosotros |
| `contacto.html` | Formulario de contacto |
| `app.html` | Panel admin (requiere login) |

---

## 🗄️ Modelo de datos

### Tabla `citas`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | text | UUID auto-generado |
| nombre | text | Nombre del cliente |
| telefono | text | Teléfono del cliente |
| email | text | Email del cliente (opcional) |
| servicio | text | Nombre del servicio agendado |
| precio | number | Precio del servicio MXN |
| duracion | text | Duración del servicio |
| fecha | text | Fecha YYYY-MM-DD |
| hora | text | Hora HH:MM (24h) |
| estado | text | pendiente / confirmada / completada / cancelada |
| notas | rich_text | Notas y preferencias |

### Tabla `ventas`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | text | UUID auto-generado |
| folio | text | Folio de venta |
| cliente | text | Nombre del cliente |
| servicios | text | Servicio(s) vendidos |
| total | number | Total MXN |
| metodo_pago | text | Efectivo / Tarjeta / Transferencia |
| estado | text | pagada / pendiente / cancelada |
| nota | text | Notas internas |
| fecha | text | Fecha YYYY-MM-DD |

### Tabla `reservas`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | text | UUID auto-generado |
| nombre | text | Nombre del contacto |
| telefono | text | Teléfono |
| email | text | Email |
| servicio | text | Servicio de interés |
| mensaje | text | Mensaje del cliente |
| fecha | text | Fecha del mensaje |

---

## 🎨 Paleta de colores

| Nombre | Hex | Uso |
|--------|-----|-----|
| Dorado | `#D08C37` | Color principal, precios, CTAs |
| Morado oscuro | `#2D0845` | Títulos, hero background |
| Morado medio | `#8B4F8B` | Categoría masajes, navbar |
| Fondo cálido | `#F5F3F0` | Fondo general |
| Verde agua | `#2A9D8F` | Éxito, confirmaciones |
| Rosa | `#C06080` | Categoría depilación |

---

## 🔐 Credenciales admin

Almacenadas en `.env` (no exponer públicamente):

```
ADMIN_USER=geleshaadmin
ADMIN_PASS=Gelesha%2026
SESSION_HOURS=168
```

> ⚠️ **Nota**: En un sitio estático, el archivo `.env` es públicamente accesible. Para producción real se recomienda migrar a **Supabase Auth** o **Firebase Auth**.

---

## ⏳ Pendiente / próximas mejoras

- [ ] Validar disponibilidad real de horarios (evitar doble booking)
- [ ] Notificación por email/WhatsApp al agendar
- [ ] Migración a Supabase para DB controlada por el cliente
- [ ] Múltiples roles de usuario (recepcionista vs. dueña)
- [ ] Integración con pasarela de pago (Stripe / MercadoPago)
- [ ] SEO optimizado (meta tags Open Graph, sitemap)
- [ ] Página de galería / antes y después
- [ ] Sistema de paquetes / promociones

---

## 📞 Contacto del negocio

- **WhatsApp**: +52 998 738 8389
- **Instagram**: @geleshaspa  
- **Horario**: Lunes–Sábado 9:00–19:00
- **Ubicación**: México
