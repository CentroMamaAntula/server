const mongoose = require("mongoose");

const DiagnosticSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  level: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: "",
  },
  code: {
    type: String,
    required: true,
    trim: "",
  },
  code_0: {
    type: String,
    trim: "",
  },
  code_1: {
    type: String,
    trim: "",
  },
  code_2: {
    type: String,
    trim: "",
  },
  code_3: {
    type: String,
    trim: "",
  },
  code_4: {
    type: String,
    trim: "",
  },
  professional_name: {
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

module.exports = mongoose.model("Diagnostic", DiagnosticSchema);
