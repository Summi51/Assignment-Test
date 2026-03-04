const express = require("express");
const router = express.Router();
const {
  saveSettings,
  getAllSettings,
  getSettingsById,
  updateSettings,
  deleteSettings,
} = require("../controllers/settingsController");

// POST   /api/settings        — save new viewer settings
router.post("/", saveSettings);

// GET    /api/settings        — get all settings (supports ?modelId=&limit=&page=)
router.get("/", getAllSettings);

// GET    /api/settings/:id    — get a specific settings record
router.get("/:id", getSettingsById);

// PUT    /api/settings/:id    — update a specific settings record
router.put("/:id", updateSettings);

// DELETE /api/settings/:id    — delete a specific settings record
router.delete("/:id", deleteSettings);

module.exports = router;
