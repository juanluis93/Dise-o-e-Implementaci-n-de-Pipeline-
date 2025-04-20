# Fullstack App - Express + TypeScript + SQLite + HTML/JS

Este proyecto contiene una aplicación fullstack dividida en dos partes:

- **Backend (`/api`)**: API REST construida con Express, TypeScript y SQLite (sin ORM)
- **Frontend (`/app`)**: Sitio estático usando HTML, Bootstrap y jQuery
- Ambos corren en contenedores separados con Docker
- Soporta despliegue automático a Railway mediante GitHub Actions

---

## 📁 Estructura del proyecto

```
.
├── api/             # Backend Express + TypeScript
│   ├── src/
│   ├── dist/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── app/             # Frontend HTML + JS
│   ├── index.html
│   ├── script.js
│   └── Dockerfile
│
├── .github/
│   └── workflows/
│       └── deploy-api.yml
│       └── deploy-app.yml
│
├── README.md
└── .gitignore
```

---

## ⚙️ Tecnologías utilizadas

### Backend

- Node.js
- Express
- TypeScript
- SQLite (sin ORM)
- Swagger
- Jest + Supertest para testing
- Docker

### Frontend

- HTML5
- Bootstrap
- jQuery
- Docker

---

## 🚀 Instrucciones para correr

### Backend (`/api`)

```bash
# Instalar dependencias
cd api
npm install

# Compilar TypeScript
npm run build

# Ejecutar en desarrollo
npm run dev

# Correr tests
npm test
```

O bien, usar Docker:

```bash
cd api
docker build -t backend-api .
docker run -p 3000:3000 backend-api
```

---

### Frontend (`/app`)

```bash
cd app
docker build -t frontend-app .
docker run -p 8080:80 frontend-app
```

Acceder al frontend en: [http://localhost:8080](http://localhost:8080)

---

## 🧪 Testing

Los tests del backend están escritos con Jest y Supertest:

```bash
cd api
npm test
```

---

## 📄 Documentación de la API

- Swagger UI: `http://localhost:3000/docs`

---

## ⚙️ Despliegue automático con GitHub Actions

Este proyecto incluye un workflow en `.github/workflows/deploy-api.yml` que:

1. Instala dependencias
2. Compila TypeScript
3. Ejecuta los tests
4. Si todo pasa, despliega a Railway con `railway up`

Además, el workflow en `.github/workflows/deploy-app.yml` despliega el frontend a Railway.

> Asegurate de guardar `RAILWAY_TOKEN` como **repository secret** en GitHub.

---

## 📝 Licencia

MIT
