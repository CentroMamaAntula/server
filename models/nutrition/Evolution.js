const mongoose = require("mongoose");

const EvolutionNutSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  evolution: {
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

module.exports = mongoose.model("EvolutionNut", EvolutionNutSchema);
