const Installation = require("../models/Installation");
const CustomSystem = require("../models/circuitmodel");

exports.createInstallation = async (req, res) => {
  try {
    const { systemId, address, phone, installationDate } = req.body;
    const userId = req.user.id;

    // Verify system exists
    const system = await CustomSystem.findById(systemId);
    if (!system) {
      return res.status(404).json({ error: "System not found" });
    }

    const installation = await Installation.create({
      userId,
      systemId,
      address,
      phone,
      installationDate
    });

    res.status(201).json({
      message: "Installation requested successfully",
      installation
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to request installation" });
  }
};

exports.getUserInstallations = async (req, res) => {
  try {
    const userId = req.user.id;
    const installations = await Installation.find({ userId }).populate("systemId");
    res.json({ installations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch installations" });
  }
};
