const mongoose = require("mongoose");

const BloodGasesSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ["Arterial", "Venosa"],
  },
  ph: {
    type: Number,
  },
  Pco2: {
    type: Number,
  },
  Po2: {
    type: Number,
  },
  So2: {
    type: Number,
  },
  HCO3: {
    type: Number,
  },
  ExcessBase: {
    type: Number,
  },
  Na: {
    type: Number,
  },
  K: {
    type: Number,
  },
  Cl: {
    type: Number,
  },
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReportLab",
    required: true,
  },
});

module.exports = mongoose.model("BloodGases", BloodGasesSchema);
