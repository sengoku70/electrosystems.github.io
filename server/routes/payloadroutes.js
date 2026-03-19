const express = require("express");
const { 
  saveCustomSystem, 
  getAllCustomSystems,
  getUserSystems,
  getCustomSystemById,
  getMine
} = require("../controllers/payloadController");
const auth = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/saveCustomSystem", auth, saveCustomSystem);
router.get("/all", getAllCustomSystems);
router.get("/user/:userId", getUserSystems);
router.get("/mine", auth, getMine);
router.get("/:systemId", getCustomSystemById);

module.exports = router;