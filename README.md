# 🎯 3D Product Viewer

A full-stack MERN application for uploading, viewing, and managing 3D models (.glb/.gltf) with interactive controls and persistent viewer settings.

---

## 🚀 Live Demo

- **Frontend:** https://assignment-test-frontend.vercel.app
- **Backend API:** https://assignment-test-taupe.vercel.app

---

## ✨ Features

- **Upload 3D Models** — Support for `.glb` and `.gltf` files (up to 100 MB)
- **Interactive 3D Viewer** — Built with Three.js
  - Rotate, pan, and zoom controls
  - Wireframe mode toggle
  - Ambient & directional lighting controls
  - Background color customization
- **Persistent Settings** — Save and load viewer configurations
- **Model Management** — View all uploaded models and delete unwanted ones
- **Cloud Storage** — Models stored on Cloudinary (Vercel-compatible)
- **Responsive Design** — Works on desktop and tablet

---

## 🛠️ Tech Stack

### Frontend
- **React** + Vite
- **Three.js** — 3D rendering
- **Axios** — HTTP client

### Backend
- **Node.js** + Express
- **MongoDB** — Model & settings storage
- **Multer** — File upload handling
- **Cloudinary** — Cloud file storage

---

## 📦 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ControlsSidebar.jsx
│   │   │   ├── ModelUpload.jsx
│   │   │   ├── SettingsPanel.jsx
│   │   │   ├── Viewer3D.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
  │   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── modelController.js
│   │   │   └── settingsController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── uploadMiddleware.js
│   │   ├── models/
│   │   │   ├── Model3D.js
│   │   │   ├── ViewerSettings.js
│   │   │   └── userModel.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── modelRoutes.js
│   │   │   └── settingsRoutes.js
│   │   └── app.js
│   ├── server.js
│   ├── .env
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

---

## 🏃 Local Development Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (Atlas or local)
- Cloudinary account

### Backend Setup

1. Navigate to backend:
```bash
cd backend
npm install
```

2. Create `.env`:
```
PORT=8080
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend:
```bash
cd frontend
npm install
```

2. Start dev server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:8080`

---

## 📡 API Endpoints

### Models
- `POST /api/models/upload` — Upload a 3D model
- `GET /api/models` — Get all models
- `GET /api/models/:id` — Get a specific model
- `DELETE /api/models/:id` — Delete a model

### Settings
- `POST /api/settings` — Save viewer settings
- `GET /api/settings` — Get all settings
- `PUT /api/settings/:id` — Update settings

### Authentication
- `POST /api/auth/register` — Register a new user. Required JSON: `{ name, email, password }`
- `POST /api/auth/login` — Login and receive a JWT. Required JSON: `{ email, password }`
- `GET /api/auth/profile` — Get current user profile (protected; send `Authorization: Bearer <token>`)

Example (local):
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Sam","email":"sam@example.com","password":"secret123"}'

curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sam@example.com","password":"secret123"}'
```

Example (deployed):
```bash
curl -X POST https://assignment-test-sage.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Sam","email":"sam@example.com","password":"secret123"}'

curl -X POST https://assignment-test-sage.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sam@example.com","password":"secret123"}'
```

Frontend notes
- The frontend stores the JWT returned by `/api/auth/login` in `localStorage` under the key `token` and sends it with protected requests as the `Authorization: Bearer <token>` header.
- Routes that require authentication will redirect to `/login` if no token is present in `localStorage`.

Server / deployment notes
- Make sure the following env variables are set for the backend (local `.env` or Vercel project settings):
  - `MONGO_URI` — MongoDB connection string
  - `JWT_SECRET` — Secret used to sign JWTs
  - `PORT` — (optional for local development)

Security note
- This project uses stateless JWT auth. For production, consider using refresh tokens, HTTPS-only cookies, and token revocation strategies if needed.

---

## 🌐 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel deploy
```

### Backend (Vercel)
```bash
vercel deploy
```

**Important:** Set Cloudinary env variables in Vercel project settings before deploying.

---

## 📝 Notes

- Files are stored on **Cloudinary** (cloud-based, works with Vercel's read-only filesystem)
- Settings are persisted in MongoDB
- Frontend API calls are proxied to the deployed backend URL

---

## 📄 License

MIT
