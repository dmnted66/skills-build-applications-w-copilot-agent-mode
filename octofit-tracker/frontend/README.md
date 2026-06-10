# OctoFit Tracker - Frontend

> React 19 + Vite application

## Quick Start

```bash
# Install dependencies
npm install

# Development (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Ports

- **Frontend:** 5173 (Vite dev server)
- **Backend:** 8000 (proxied from frontend)
- **MongoDB:** 27017 (MongoDB server)

## Configuration

### Vite Config (vite.config.js)

- Dev server: **port 5173**
- Backend proxy: **http://localhost:8000**
- Auto-open browser on start
- Source maps for development

## Components

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Main component
├── App.css                   # Styles
├── index.css                 # Global styles
└── components/
    ├── Dashboard.jsx         # Stats display
    ├── ActivityForm.jsx      # Form to log activities
    ├── ActivityList.jsx      # List activities
    └── *.css                 # Component styles
```

## Features

- Activity logging
- Daily statistics dashboard
- Weekly progress tracking
- Activity history with delete
- Responsive design
- Real-time API integration

## Scripts

- `npm run dev` - Development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## API Integration

Frontend proxies requests to backend:

```
Frontend (5173) → Vite Proxy → Backend (8000)
```

All `/api/*` requests are forwarded to `http://localhost:8000/api/*`

---

**Built with React 19 and Vite! ⚡🚀**
