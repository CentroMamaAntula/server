const mongoose = require("mongoose");

const NursingExamSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  weight: {
    type: Number,
  },
  size: {
    type: Number,
  },
  imc: {
    type: Number,
  },
  abdomen: {
    type: Number,
  },
  temperature: {
    type: Number,
  },
  systolic_blood_pressure: {
    type: Number,
  },
  half_blood_pressure: {
    type: Number,
  },
  diastolic_blood_pressure: {
    type: Number,
  },
  heart_rate: {
    type: Number,
  },
  breathing_frequency: {
    type: Number,
  },
  saturometry: {
    type: Number,
  },
  saturometry: {
    type: Number,
  },
  observations: {
    type: String,
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

module.exports = mongoose.model("NursingExam", NursingExamSchema);
