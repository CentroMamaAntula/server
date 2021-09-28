const mongoose = require("mongoose");
const Report = require("./report");

const ReportLabSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  report: {
    type: [Report],
    required: true,
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
  professional_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ReportLab", ReportLabSchema);
