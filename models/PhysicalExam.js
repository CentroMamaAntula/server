const mongoose = require("mongoose");

const PhysicalExamSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  temperature: {
    type: Number,
  },
  skin: {
    type: String,
    trim: "",
  },
  soft_parts: {
    type: String,
    trim: true,
  },
  blood_pressure: {
    type: String,
  },
  heart_rate: {
    type: Number,
  },
  cardiovascular_exam: {
    type: String,
    trim: "",
  },
  breathing_frequency: {
    type: Number,
  },
  saturometry: {
    type: Number,
  },
  lower_limbs: {
    type: String,
    trim: true,
  },
  respiratory_exam: {
    type: String,
    trim: true,
  },
  abdomen: {
    type: String,
    trim: true,
  },
  time_space: {
    type: Boolean,
  },
  neurological_exam: {
    type: String,
    trim: true,
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
  type: {
    type: String,
    enum: ["de Enfermería", "Médico"],
    default: "de Enfermería",
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
});

module.exports = mongoose.model("PhysicalExam", PhysicalExamSchema);
