const mongoose = require("mongoose");

const BloodCountSchema = mongoose.Schema({
  countRed: { type: Number },
  hemoglobin: { type: Number },
  hematocrit: { type: Number },
  rdw: { type: Number },
  vmc: { type: Number },
  hcm: { type: Number },
  chcm: { type: Number },
  countWhite: { type: Number },
  neutrofolios: { type: Number },
  eosinofilos: { type: Number },
  basofilos: { type: Number },
  monocitos: { type: Number },
  linfocitos: { type: Number },
  countPlaqueta: { type: Number },
  eritrosedimentacion: { type: Number },
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReportLab",
    required: true,
  },
});

module.exports = mongoose.model("BloodCount", BloodCountSchema);
