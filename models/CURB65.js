const mongoose = require("mongoose");

const CURB65Schema = mongoose.Schema({
  date: {
    type: Date,
    default: new Date().toLocaleDateString(),
    trim: true,
  },
  confusion: {
    type: Boolean,
    required: true,
  },
  urea: {
    type: Number,
  },
  breathing: {
    type: Number,
    required: true,
  },
  systolic_blood_pressure: {
    type: Number,
    required: true,
  },
  diastolic_blood_pressure: {
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

module.exports = mongoose.model("CURB65", CURB65Schema);
