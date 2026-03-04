# 🎯 3D Product Viewer

A full-stack MERN application for uploading, viewing, and managing 3D models (.glb/.gltf) with interactive controls and persistent viewer settings.

---

## 🚀 Live Demo

- **Frontend:** https://assignment-test-frontend.vercel.app/
- **Backend API:** https://assignment-test-sage.vercel.app/api

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
│   │   │   └── Viewer3D.jsx
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
│   │   │   └── uploadMiddleware.js
│   │   ├── models/
│   │   │   ├── Model3D.js
│   │   │   └── ViewerSettings.js
│   │   ├── routes/
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