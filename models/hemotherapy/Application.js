const mongoose = require("mongoose");

const ApplicationHemoSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  hemocomponente: {
    type: String,
  },
  numUnidad: {
    type: Number,
  },
  tecnicas: {
    type: String,
    required: true,
  },
  resultados: {
    type: String,
    required: true,
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
  professional_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("ApplicationHemo", ApplicationHemoSchema);
