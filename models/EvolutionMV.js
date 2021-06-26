const mongoose = require("mongoose");

const EvolutionMVSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    require: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  FiO2: {
    type: Number,
  },
  onda: {
    type: Number,
  },
  time_ins: {
    type: Number,
  },
  breathing_frequency: {
    type: Number,
  },
  tidal_volumen: {
    type: Number,
  },
  PEEP: {
    type: Number,
  },
  peak_pressure: {
    type: Number,
  },
  plateau_pressure: {
    type: Number,
  },
  base_pressure: {
    type: Number,
  },
  compliance: {
    type: String,
    trim: true,
  },
  v_minute: {
    type: Number,
  },
  r_time: {
    type: Number,
  },
  frequency: {
    type: Number,
  },
  control_pressure: {
    type: Number,
  },
  sensitivity: {
    type: Number,
  },
  subtype: {
    type: String,
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

module.exports = mongoose.model("EvolutionMV", EvolutionMVSchema);
