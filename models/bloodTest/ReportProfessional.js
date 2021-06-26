const mongoose = require("mongoose");

const ReportProfSchema = mongoose.Schema({
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReportLab",
    required: true,
  },
  professional_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ReportProf", ReportProfSchema);
