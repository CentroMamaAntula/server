const mongoose = require("mongoose");

const ComplementaryStudiesSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
    require: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Laboratorio", "Rx", "Ecografía", "Otro"],
  },
  result: {
    type: Buffer,
  },
  observations: {
    type: String,
    trim: true,
  },
  professional_name: {
    type: String,
    required: true,
  },
  type_file: {
    type: String,
    required: true,
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
});

module.exports = mongoose.model(
  "ComplementaryStudies",
  ComplementaryStudiesSchema
);
