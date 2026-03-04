const path = require("path");
const fs = require("fs");
const Model3D = require("../models/Model3D");

/**
 * @desc    Upload a 3D model (.glb / .gltf)
 * @route   POST /api/models/upload
 * @access  Public
 */
const uploadModel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Please attach a .glb or .gltf file.",
      });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    // Save metadata to MongoDB
    const model = await Model3D.create({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      filePath: req.file.path,
      fileUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Model uploaded successfully.",
      data: {
        id: model._id,
        originalName: model.originalName,
        fileName: model.fileName,
        fileSize: model.fileSize,
        fileUrl: model.fileUrl,
        uploadedAt: model.uploadedAt,
      },
    });
  } catch (error) {
    console.error("uploadModel error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while uploading model.",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all uploaded models (list)
 * @route   GET /api/models
 * @access  Public
 */
const getAllModels = async (req, res) => {
  try {
    const models = await Model3D.find().sort({ uploadedAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      count: models.length,
      data: models,
    });
  } catch (error) {
    console.error("getAllModels error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching models.",
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single model by ID
 * @route   GET /api/models/:id
 * @access  Public
 */
const getModelById = async (req, res) => {
  try {
    const model = await Model3D.findById(req.params.id).lean();

    if (!model) {
      return res.status(404).json({
        success: false,
        message: "Model not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: model,
    });
  } catch (error) {
    console.error("getModelById error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching model.",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a model by ID (removes file + DB record)
 * @route   DELETE /api/models/:id
 * @access  Public
 */
const deleteModel = async (req, res) => {
  try {
    const model = await Model3D.findById(req.params.id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: "Model not found.",
      });
    }

    // Remove file from disk
    if (fs.existsSync(model.filePath)) {
      fs.unlinkSync(model.filePath);
    }

    await model.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Model deleted successfully.",
    });
  } catch (error) {
    console.error("deleteModel error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting model.",
      error: error.message,
    });
  }
};

module.exports = { uploadModel, getAllModels, getModelById, deleteModel };
