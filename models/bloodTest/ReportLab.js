const mongoose = require("mongoose");

const ReportLabSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
});

module.exports = mongoose.model("ReportLab", ReportLabSchema);
