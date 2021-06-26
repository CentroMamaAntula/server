const mongoose = require("mongoose");

const SOFASchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: new Date().toLocaleDateString(),
  },
  PaO2: {
    type: Number,
    required: true,
  },
  FiO2: {
    type: Number,
    required: true,
  },
  mechanical_ventilation: {
    type: Boolean,
    required: true,
  },
  platelets: {
    type: Number,
    required: true,
  },
  glasgow: {
    type: Number,
    required: true,
  },
  bilirubin: {
    type: Number,
    required: true,
  },
  blood_pressure: {
    /* 
    Hypotension absent (0)
    Mean arterial pressure <70 mmHg (1)
    On Dopamine ≤5 mcg/kg/min or any Dobutamine (2)
    On Dopamine >5 mcg/kg/min, Epinephrine <=0.1 mcg/kg/min or Norepinephrine <=0.1 mcg/kg/min (3)
    On Dopamine >15 mcg/kg/min or Epinephrine >0.1 mcg/kg/min or Norepinephrine >0.1 mcg/kg/min (4) */
    type: Number,
    required: true,
  },
  creatinine: {
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

module.exports = mongoose.model("SOFA", SOFASchema);
