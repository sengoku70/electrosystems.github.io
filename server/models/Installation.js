const mongoose = require("mongoose");

const installationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  systemId: { type: mongoose.Schema.Types.ObjectId, ref: "CustomSystem", required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  installationDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["pending", "scheduled", "completed", "cancelled"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Installation", installationSchema);
