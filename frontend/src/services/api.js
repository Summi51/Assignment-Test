import axios from "axios";

const api = axios.create({
  baseURL: "https://assignment-test-sage.vercel.app/api",
});

// ── Model APIs ──────────────────────────────────
export const uploadModel = (formData, onProgress) =>
  api.post("/models/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total));
    },
  });

export const getAllModels = () => api.get("/models");

export const deleteModel = (id) => api.delete(`/models/${id}`);

// ── Settings APIs ───────────────────────────────
export const saveSettings = (payload) => api.post("/settings", payload);

export const getAllSettings = () => api.get("/settings");

export const updateSettings = (id, payload) => api.put(`/settings/${id}`, payload);
