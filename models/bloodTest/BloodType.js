const mongoose = require("mongoose");

const BloodCountSchema = mongoose.Schema({
  type: { type: String, enum: ["A", "B", "AB", "O"] },
  factor: { type: String, enum: ["+", "-"] },
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReportLab",
    required: true,
  },
});

module.exports = mongoose.model("BloodCount", BloodCountSchema);
