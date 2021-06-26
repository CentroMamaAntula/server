const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    require: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "Alta",
      "Ingreso",
      "Cambio de Sector",
      "Derivacion",
      "Obito",
      "Triaje",
    ],
    default: "Ingreso",
  },
  place: {
    //lugar de procedencia
    type: String,
    trim: true,
  },
  medical_referral: {
    type: String,
  },
  extension: {
    type: String,
  },
  observations: {
    type: String,
    trim: true,
  },
  bed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bed",
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
});

module.exports = mongoose.model("Activity", ActivitySchema);
