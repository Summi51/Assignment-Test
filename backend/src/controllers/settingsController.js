const ViewerSettings = require("../models/ViewerSettings");

/**
 * @desc    Save viewer settings (background color, wireframe, lights, camera)
 * @route   POST /api/settings
 * @access  Public
 */
const saveSettings = async (req, res) => {
  try {
    const {
      modelId,
      backgroundColor,
      wireframe,
      ambientLightIntensity,
      directionalLightIntensity,
      cameraPosition,
    } = req.body;

    const settings = await ViewerSettings.create({
      modelId: modelId || null,
      backgroundColor: backgroundColor || "#1a1a2e",
      wireframe: wireframe !== undefined ? wireframe : false,
      ambientLightIntensity:
        ambientLightIntensity !== undefined ? ambientLightIntensity : 1.0,
      directionalLightIntensity:
        directionalLightIntensity !== undefined
          ? directionalLightIntensity
          : 1.5,
      cameraPosition: cameraPosition || { x: 0, y: 1, z: 3 },
      savedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Viewer settings saved successfully.",
      data: settings,
    });
  } catch (error) {
    console.error("saveSettings error:", error);

    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        errors: messages,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while saving settings.",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all saved viewer settings (most recent first)
 * @route   GET /api/settings
 * @access  Public
 */
const getAllSettings = async (req, res) => {
  try {
    const { modelId, limit = 10, page = 1 } = req.query;

    const query = {};
    if (modelId) query.modelId = modelId;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [settings, total] = await Promise.all([
      ViewerSettings.find(query)
        .populate("modelId", "originalName fileUrl")
        .sort({ savedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      ViewerSettings.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      count: settings.length,
      data: settings,
    });
  } catch (error) {
    console.error("getAllSettings error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching settings.",
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single viewer settings record by ID
 * @route   GET /api/settings/:id
 * @access  Public
 */
const getSettingsById = async (req, res) => {
  try {
    const settings = await ViewerSettings.findById(req.params.id)
      .populate("modelId", "originalName fileUrl")
      .lean();

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("getSettingsById error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching settings.",
      error: error.message,
    });
  }
};

/**
 * @desc    Update an existing viewer settings record
 * @route   PUT /api/settings/:id
 * @access  Public
 */
const updateSettings = async (req, res) => {
  try {
    const settings = await ViewerSettings.findById(req.params.id);

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings record not found.",
      });
    }

    const allowedFields = [
      "backgroundColor",
      "wireframe",
      "ambientLightIntensity",
      "directionalLightIntensity",
      "cameraPosition",
      "modelId",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    settings.savedAt = new Date();
    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      data: settings,
    });
  } catch (error) {
    console.error("updateSettings error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        errors: messages,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while updating settings.",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a viewer settings record by ID
 * @route   DELETE /api/settings/:id
 * @access  Public
 */
const deleteSettings = async (req, res) => {
  try {
    const settings = await ViewerSettings.findById(req.params.id);

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Settings record not found.",
      });
    }

    await settings.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Settings deleted successfully.",
    });
  } catch (error) {
    console.error("deleteSettings error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting settings.",
      error: error.message,
    });
  }
};

module.exports = {
  saveSettings,
  getAllSettings,
  getSettingsById,
  updateSettings,
  deleteSettings,
};
