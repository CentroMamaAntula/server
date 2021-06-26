const mongoose = require("mongoose");

const MedicalHistorySchema = mongoose.Schema({
  date: {
    // nose
    type: Date,
    default: new Date(Date.now()).toLocaleDateString(),
  },
  diabetes: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_diabetes: {
    type: String,
    trim: true,
  },
  epoc_asma: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_epoc: {
    type: String,
    trim: true,
  },
  renal_cronica: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_renal: {
    type: String,
    trim: true,
  },
  cardiovascular: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_cardio: {
    type: String,
    trim: true,
  },
  inmunocomprometido: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_inmuno: {
    type: String,
    trim: true,
  },
  obesidad_morbida: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_obesidad: {
    type: String,
    trim: true,
  },
  tabaquismo: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_tabaquismo: {
    type: String,
    trim: true,
  },
  alcoholismo: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_alcoholismo: {
    type: String,
    trim: true,
  },
  adiccion: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_adiccion: {
    type: String,
    trim: true,
  },
  alergias: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_alergias: {
    type: String,
    trim: true,
  },
  psicologicos_psiquiuatricos: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_psi: {
    type: String,
    trim: true,
  },
  violencia: {
    type: String,
    enum: ["Personales", "Familiares", "Ambos", "Ninguno"],
  },
  obs_violencia: {
    type: String,
    trim: true,
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
});

module.exports = mongoose.model("MedicalHistory", MedicalHistorySchema);
