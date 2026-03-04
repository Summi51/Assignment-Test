const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  uploadModel,
  getAllModels,
  getModelById,
  deleteModel,
} = require("../controllers/modelController");

// POST   /api/models/upload  — upload a .glb/.gltf file
router.post("/upload", upload.single("model"), uploadModel);

// GET    /api/models          — list all uploaded models
router.get("/", getAllModels);

// GET    /api/models/:id      — get a single model by Mongo ID
router.get("/:id", getModelById);

// DELETE /api/models/:id      — delete a model (DB + file on disk)
router.delete("/:id", deleteModel);

module.exports = router;
