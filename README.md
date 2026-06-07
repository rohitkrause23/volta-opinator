# VOLTA · Prueba creativa OPINATOR

Prueba creativa para el puesto de **Frontend Web Designer** en OPINATOR.
Diseñé una marca premium de automoción (*VOLTA* — "unbranded" Porsche, EV imaginario) y construí las 3 piezas como un sistema coherente.

— Rohit Krause · Junio 2026

---

## Stack

- **Vanilla HTML/CSS/JS** — sin frameworks ni runtime
- **Vite** para dev server con HMR y build optimizado
- **Sora + Inter** desde Google Fonts
- **CSS custom properties** para el sistema cromático
- **Pointer Events API** para interactividad cross-input (mouse, touch, pen)

## Quick start

```bash
npm install
npm run dev      # dev server con HMR en http://localhost:5173
npm run build    # build de producción a /dist
npm run preview  # preview del build de producción
```

## Estructura

```
volta-opinator/
├── index.html      # Landing
├── opi.html        # OPI form interactivo
├── cartel.html     # Cartel A3 final (imagen)
├── sistema.html    # Design tokens + componentes
├── vite.config.js  # Multi-page app config
└── assets/
    ├── css/        # tokens / base / components / + 1 por página
    ├── js/         # opi.js (módulo)
    └── img/        # fotos + cartel-a3.png
```

## Piezas

| # | Pieza | URL |
|---|---|---|
| 01 | OPI · Form interactivo | `/opi.html` |
| 02 | Cartel A3 · Concesionario | `/cartel.html` |
| 03 | Sistema · Design tokens | `/sistema.html` |

## Deploy

Vite + Vercel — sin configuración. Vercel auto-detecta `vite build` y sirve `/dist`.

# Prueba-OPINATOR
