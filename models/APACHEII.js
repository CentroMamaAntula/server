const mongoose = require("mongoose");

const APACHEIISchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: new Date().toLocaleDateString(),
  },
  temperature: {
    type: Number,
    required: true,
  },
  blood_pressure: {
    type: Number,
    required: true,
  },
  heart_rate: {
    type: Number,
    required: true,
  },
  breathing_frequency: {
    type: Number,
    required: true,
  },
  FiO2: {
    type: Number,
    required: true,
  },
  PaO2: {
    type: Number,
    required: true,
  },
  pH_arterial: {
    type: Number,
    required: true,
  },
  na_serico: {
    type: Number,
    required: true,
  },
  k_serico: {
    type: Number,
    required: true,
  },
  insuficiencia_renal: {
    type: Boolean,
    required: true,
  },
  creatinina_serica: {
    type: Number,
    required: true,
  },
  hematocrito: {
    type: Number,
    required: true,
  },
  leucocitos: {
    type: Number,
    required: true,
  },
  glasgow: {
    type: Number,
    required: true,
  },
  chronic_problems: {
    /*1 N, 2 NQ, 3 OQU, 4 OQP */
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
});

module.exports = mongoose.model("APACHEII", APACHEIISchema);
