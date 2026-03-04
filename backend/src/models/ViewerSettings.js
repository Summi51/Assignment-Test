const mongoose = require("mongoose");

const ViewerSettingsSchema = new mongoose.Schema(
  {
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model3D",
      default: null,
    },
    backgroundColor: {
      type: String,
      default: "#1a1a2e",
      match: [/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid hex color code"],
    },
    wireframe: {
      type: Boolean,
      default: false,
    },
    ambientLightIntensity: {
      type: Number,
      default: 1.0,
      min: 0,
      max: 10,
    },
    directionalLightIntensity: {
      type: Number,
      default: 1.5,
      min: 0,
      max: 10,
    },
    cameraPosition: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 1 },
      z: { type: Number, default: 3 },
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ViewerSettings", ViewerSettingsSchema);
