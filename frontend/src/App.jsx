import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Viewer3D from "./components/Viewer3D";
import ModelUpload from "./components/ModelUpload";
import ControlsSidebar from "./components/ControlsSidebar";
import SettingsPanel from "./components/SettingsPanel";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

export default function App() {
  // Viewer state
  const [modelUrl, setModelUrl] = useState(null);
  const [modelId, setModelId] = useState(null);
  const [bgColor, setBgColor] = useState("#1a1a2e");
  const [wireframe, setWireframe] = useState(false);
  const [ambientIntensity, setAmbientIntensity] = useState(1.0);
  const [directionalIntensity, setDirectionalIntensity] = useState(1.5);

  const handleModelLoaded = (url, id) => {
    setModelUrl(url);
    setModelId(id);
  };

  const handleLoadSettings = ({ bgColor, wireframe, ambientIntensity, directionalIntensity }) => {
    setBgColor(bgColor);
    setWireframe(wireframe);
    setAmbientIntensity(ambientIntensity);
    setDirectionalIntensity(directionalIntensity);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <header className="app-header">
                <div className="header-brand">
                  <span className="header-icon">🧊</span>
                  <h1>3D Product Viewer</h1>
                </div>
                <span className="header-sub">MERN + Three.js Assignment</span>
              </header>

              <div className="app-body">
                <aside className="sidebar">
                  <ModelUpload onModelLoaded={handleModelLoaded} />
                  <ControlsSidebar
                    bgColor={bgColor}
                    setBgColor={setBgColor}
                    wireframe={wireframe}
                    setWireframe={setWireframe}
                    ambientIntensity={ambientIntensity}
                    setAmbientIntensity={setAmbientIntensity}
                    directionalIntensity={directionalIntensity}
                    setDirectionalIntensity={setDirectionalIntensity}
                  />
                  <SettingsPanel
                    modelId={modelId}
                    bgColor={bgColor}
                    wireframe={wireframe}
                    ambientIntensity={ambientIntensity}
                    directionalIntensity={directionalIntensity}
                    onLoadSettings={handleLoadSettings}
                  />
                </aside>

                <main className="canvas-area">
                  <Viewer3D
                    modelUrl={modelUrl}
                    bgColor={bgColor}
                    wireframe={wireframe}
                    ambientIntensity={ambientIntensity}
                    directionalIntensity={directionalIntensity}
                  />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
