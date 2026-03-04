import { useRef, useState } from "react";
import { uploadModel } from "../services/api";

export default function ModelUpload({ onModelLoaded }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    if (!["glb", "gltf"].includes(ext)) {
      setError("Only .glb and .gltf files are allowed.");
      return;
    }

    setError("");
    setSuccess("");
    setUploading(true);
    setProgress(0);

    // Show local preview immediately while upload happens in background
    const localUrl = URL.createObjectURL(file);
    onModelLoaded(localUrl, null);

    try {
      const formData = new FormData();
      formData.append("model", file);

      const res = await uploadModel(formData, setProgress);
      const serverUrl = res.data.data.fileUrl;
      const modelId = res.data.data.id;

      onModelLoaded(localUrl, modelId);
      setSuccess(`✅ "${file.name}" uploaded successfully.`);
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed. Please retry.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const onInputChange = (e) => handleFile(e.target.files[0]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="panel">
      <h3 className="panel-title">📁 Upload 3D Model</h3>

      {/* Drop zone */}
      <div
        className={`dropzone ${dragging ? "dragging" : ""}`}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <span className="dropzone-icon">⬆️</span>
        <p>Drag & drop or <strong>click to browse</strong></p>
        <p className="dropzone-hint">.glb / .gltf — max 100 MB</p>
        <input
          ref={inputRef}
          type="file"
          accept=".glb,.gltf"
          style={{ display: "none" }}
          onChange={onInputChange}
        />
      </div>

      {/* Progress bar */}
      {uploading && (
        <div className="progress-wrap">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <span>{progress}%</span>
        </div>
      )}

      {error && <p className="msg error">{error}</p>}
      {success && <p className="msg success">{success}</p>}
    </div>
  );
}
