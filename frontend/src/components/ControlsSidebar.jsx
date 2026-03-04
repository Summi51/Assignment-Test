export default function ControlsSidebar({
  bgColor,
  setBgColor,
  wireframe,
  setWireframe,
  ambientIntensity,
  setAmbientIntensity,
  directionalIntensity,
  setDirectionalIntensity,
}) {
  return (
    <div className="panel">
      <h3 className="panel-title">🎛️ Viewer Controls</h3>

      {/* Background Color */}
      <div className="control-row">
        <label className="control-label">Background Color</label>
        <div className="color-row">
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="color-input"
          />
          <span className="color-value">{bgColor}</span>
        </div>
      </div>

      {/* Wireframe toggle */}
      <div className="control-row">
        <label className="control-label">Wireframe Mode</label>
        <button
          className={`toggle-btn ${wireframe ? "active" : ""}`}
          onClick={() => setWireframe((prev) => !prev)}
        >
          {wireframe ? "ON" : "OFF"}
        </button>
      </div>

      {/* Ambient light */}
      <div className="control-row">
        <label className="control-label">
          Ambient Light &nbsp;<span className="val-badge">{ambientIntensity.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={ambientIntensity}
          onChange={(e) => setAmbientIntensity(parseFloat(e.target.value))}
          className="slider"
        />
      </div>

      {/* Directional light */}
      <div className="control-row">
        <label className="control-label">
          Directional Light &nbsp;<span className="val-badge">{directionalIntensity.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={directionalIntensity}
          onChange={(e) => setDirectionalIntensity(parseFloat(e.target.value))}
          className="slider"
        />
      </div>

      {/* Mouse controls hint */}
      <div className="hint-box">
        <p>🖱️ <strong>Left drag</strong> — Rotate</p>
        <p>🖱️ <strong>Scroll</strong> — Zoom</p>
        <p>🖱️ <strong>Right drag</strong> — Pan</p>
      </div>
    </div>
  );
}
