const mongoose = require("mongoose");

const NEWS2Schema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: new Date().toLocaleDateString(),
  },
  breathing_frequency: {
    type: Number,
    required: true,
  },
  o2_saturation: {
    type: Number,
    required: true,
  },
  epoc: {
    type: Boolean,
    required: true,
  },
  supplemental_oxygen: {
    type: Boolean,
    required: true,
  },
  systolic_blood_pressure: {
    type: Number,
    required: true,
  },
  heart_rate: {
    type: Number,
    required: true,
  },
  conscience_level: {
    type: Boolean, //alerta true
    required: true,
  },
  temperature: {
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

module.exports = mongoose.model("NEWS2", NEWS2Schema);
