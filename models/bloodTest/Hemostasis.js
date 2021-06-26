const mongoose = require("mongoose");

const HematosisSchema = mongoose.Schema({
  countRed: { type: Number },
  prothrombinTime: { type: Number },
  hematocrit: { type: Number },
  activityPercentage: { type: Number },
  rin: { type: Number },
  kptt: { type: Number },
  dimeroD: { type: Number },
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReportLab",
    required: true,
  },
});

module.exports = mongoose.model("Hematosis", HematosisSchema);
