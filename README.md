# GELESHA — Sitio Web Oficial
### 🌿 Spa · Estética Corporal y Facial 🌸

---

## 📋 Descripción
Sitio web con catálogo completo de servicios y precios de **GELESHA**, con buscador interactivo.  
Datos extraídos directamente del archivo: `catalogo y top productos.xlsx`

---

## 🎨 Colores oficiales
| Token | HEX | Uso |
|---|---|---|
| Dorado marca | `#D08C37` | Botones, acentos, precios |
| Púrpura medio | `#8B4F8B` | Gradientes, filtros activos |
| Oscuro | `#373435` | Footer, stats |

---

## ✅ Funcionalidades
- **Hero** con gradiente y CTA hacia el catálogo
- **Sección de 5 categorías** con resumen de servicios
- **Catálogo completo con buscador** en tiempo real:
  - Búsqueda por texto (nombre del servicio)
  - Filtros por categoría: Masajes, Faciales, Aparatología, Reductivos, Depilación, Otros
  - Contador de resultados dinámico
  - Botón de limpiar búsqueda
  - Resaltado de términos buscados
  - **62 servicios** con nombre, precio y duración
- **Sección Nosotros** con animación visual
- **Testimonios** con slider táctil
- **Banner CTA** con WhatsApp
- **Formulario de contacto** con validación y guardado en BD
- **WhatsApp flotante** con animación
- **Navbar** con scroll spy y menú hamburguesa

---

## 📦 Servicios incluidos (62 en total)

| Categoría | Cantidad | Precio desde |
|---|---|---|
| 💆 Masajes | 12 | $500 |
| ✨ Faciales | 8 | $700 |
| ⚡ Aparatología | 6 | $500 |
| 🔥 Reductivos | 11 | $500 |
| 🌿 Depilación | 19 | $250 |
| 💎 Otros | 4 | $500 |

---

## 📁 Estructura
```
index.html     → Página principal
css/style.css  → Estilos con paleta Gelesha
js/main.js     → Catálogo completo + buscador + interactividad
images/logo.png → Logo oficial
```

---

## 🗄️ BD: tabla `reservas`
| Campo | Tipo |
|---|---|
| nombre | text |
| telefono | text |
| email | text |
| servicio | text |
| mensaje | rich_text |
| fecha | datetime |

---

## 🚧 Próximos pasos
- [ ] Añadir imágenes reales de cada tratamiento
- [ ] Conectar WhatsApp y redes sociales reales
- [ ] Agregar ubicación en Google Maps
- [ ] Galería con fotos antes/después

*Hecho con 💜 para GELESHA*
