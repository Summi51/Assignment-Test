import { useState, useEffect } from "react";
import { saveSettings, getAllSettings } from "../services/api";

export default function SettingsPanel({
  modelId,
  bgColor,
  wireframe,
  ambientIntensity,
  directionalIntensity,
  onLoadSettings,
}) {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const showMsg = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSettings({
        modelId: modelId || undefined,
        backgroundColor: bgColor,
        wireframe,
        ambientLightIntensity: ambientIntensity,
        directionalLightIntensity: directionalIntensity,
        savedAt: new Date().toISOString(),
      });
      showMsg("✅ Settings saved to database!");
      fetchHistory();
    } catch (err) {
      showMsg("❌ Failed to save settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getAllSettings();
      setHistory(res.data.data || []);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const applySettings = (s) => {
    onLoadSettings({
      bgColor: s.backgroundColor,
      wireframe: s.wireframe,
      ambientIntensity: s.ambientLightIntensity,
      directionalIntensity: s.directionalLightIntensity,
    });
    showMsg("✅ Settings applied!");
  };

  return (
    <div className="panel">
      <h3 className="panel-title">💾 Save / Load Settings</h3>

      <button
        className="btn-primary"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving…" : "Save Current Settings"}
      </button>

      {msg.text && <p className={`msg ${msg.type}`}>{msg.text}</p>}

      <div className="settings-history">
        <h4 className="history-title">
          Saved Configurations
          <button className="refresh-btn" onClick={fetchHistory}>↻</button>
        </h4>

        {loading && <p className="loading-text">Loading…</p>}

        {!loading && history.length === 0 && (
          <p className="empty-text">No saved settings yet.</p>
        )}

        <ul className="history-list">
          {history.map((s) => (
            <li key={s._id} className="history-item">
              <span className="history-info">
                <span
                  className="color-dot"
                  style={{ background: s.backgroundColor }}
                />
                <span className="history-meta">
                  BG: {s.backgroundColor} &nbsp;|&nbsp;
                  Wireframe: {s.wireframe ? "On" : "Off"}
                </span>
              </span>
              <button
                className="btn-apply"
                onClick={() => applySettings(s)}
              >
                Apply
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
