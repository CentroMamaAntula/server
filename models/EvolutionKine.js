const mongoose = require("mongoose");

const EvolutionKineSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    require: true,
    trim: true,
  },
  O2_admin: {
    type: Boolean,
    required: true,
  },
  flow: {
    //true: alto flujo, false: bajo flujo
    type: Boolean,
  },
  rox: {
    type: Number,
  },
  SpO2: {
    type: Number,
  },
  FiO2: {
    type: Number,
  },
  breathing_frequency: {
    type: Number,
  },
  mechanic_ventilation: {
    type: String,
  },
  respiratory_mechanics: {
    type: String,
  },
  blood_pressure: {
    // sist/diast
    type: String,
  },
  heart_rate: {
    type: Number,
  },
  auscultation: {
    type: String,
  },
  blood_gases: {
    type: String,
  },
  indications: {
    type: String,
  },
  observations: {
    type: String,
    trim: true,
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

module.exports = mongoose.model("EvolutionKine", EvolutionKineSchema);
