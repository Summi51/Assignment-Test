const express = require("express");
const cors = require("cors");
const path = require("path");

const modelRoutes = require("./routes/modelRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const app = express();

// ──────────────────────────────────────────────
// Middleware
// ──────────────────────────────────────────────
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files as static assets
// e.g.  GET /uploads/<filename>.glb

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ──────────────────────────────────────────────
// API Routes
// ──────────────────────────────────────────────
app.use("/api/models", modelRoutes);
app.use("/api/settings", settingsRoutes);

// Health-check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "3D Product Viewer API is running.",
    timestamp: new Date().toISOString(),
  });
});

// Root route for basic sanity check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "3D Product Viewer API is running.",
    timestamp: new Date().toISOString(),
  });
});
// ──────────────────────────────────────────────
// 404 handler — catches unknown routes
// ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ──────────────────────────────────────────────
// Global error handler
// ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  // Multer specific errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File too large. Maximum allowed size is 100 MB.",
    });
  }

  if (err.message && err.message.includes("Invalid file type")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
