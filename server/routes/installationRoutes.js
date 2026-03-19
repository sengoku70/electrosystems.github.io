const express = require("express");
const { createInstallation, getUserInstallations } = require("../controllers/installationController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/request", auth, createInstallation);
router.get("/mine", auth, getUserInstallations);

module.exports = router;
