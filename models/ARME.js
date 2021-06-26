const mongoose = require("mongoose");

const ARMESchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  mode: {
    type: String,
    trim: true,
  },
  breathing_frequency: {
    type: Number,
    trim: true,
  },
  fiO2: {
    type: Number,
    trim: true,
  },
  inspiration: {
    type: Number,
    trim: true,
  },
  expiration: {
    type: Number,
    trim: true,
  },
  pim: {
    type: Number,
    trim: true,
  },
  peep: {
    type: Number,
    trim: true,
  },
  vol: {
    type: Number,
    trim: true,
  },
  observations: {
    type: String,
    trim: true,
  },
  id_nurse: {
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

module.exports = mongoose.model("ARME", ARMESchema);
