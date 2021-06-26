const mongoose = require("mongoose");

const SAPSIISchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: new Date().toLocaleDateString(),
  },
  age: {
    type: Number,
    required: true,
  },
  heart_rate: {
    type: Number,
    required: true,
  },
  blood_pressure: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  glasgow: {
    type: Number,
    required: true,
  },
  mechanical_ventilation: {
    type: Boolean,
    required: true,
  },
  PaO2_FIO2: {
    type: Number,
    required: true,
  },
  urea: {
    type: Number,
    required: true,
  },
  urine_output: {
    type: Number,
    required: true,
  },
  sodium: {
    type: Number,
    required: true,
  },
  potassium: {
    type: Number,
    required: true,
  },
  bicarbonate: {
    type: Number,
    required: true,
  },
  bilirubin: {
    type: Number,
    required: true,
  },
  leucocitos: {
    type: String,
    required: true,
  },
  chronic_disease: {
    type: String,
    required: true,
  },
  type_admission: {
    type: String,
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

module.exports = mongoose.model("SAPSII", SAPSIISchema);
