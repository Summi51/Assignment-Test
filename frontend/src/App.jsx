import { useState } from "react";
import Viewer3D from "./components/Viewer3D";
import ModelUpload from "./components/ModelUpload";
import ControlsSidebar from "./components/ControlsSidebar";
import SettingsPanel from "./components/SettingsPanel";
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
    <div className="app-layout">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-brand">
          <span className="header-icon">🧊</span>
          <h1>3D Product Viewer</h1>
        </div>
        <span className="header-sub">MERN + Three.js Assignment</span>
      </header>

      <div className="app-body">
        {/* ── Left Sidebar ── */}
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

        {/* ── 3D Canvas ── */}
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
  );
}
