const mongoose = require("mongoose");

const TreatmentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  observations: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    require: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["de Enfermería", "Médico"],
    default: "de Enfermería",
  },
  professional_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
});

module.exports = mongoose.model("Treatment", TreatmentSchema);
