const mongoose = require("mongoose");

const Model3DSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: [true, "Original file name is required"],
      trim: true,
    },
    fileName: {
      type: String,
      required: [true, "Stored file name is required"],
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String, // stored as-is — browsers send varying mimetypes for .glb/.gltf
    },
    filePath: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Model3D", Model3DSchema);
