const mongoose = require("mongoose");

const HisopadoSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: new Date().toLocaleDateString(),
  },
  type: {
    /*hisopado aspirado */
    type: String,
    trim: true,
  },
  sample: {
    type: Boolean,
    required: true,
  },
  result: {
    type: String,
    required: true,
    enum: ["Negativo", "Positivo", "Pendiente", "Muestra Insuficiente"],
  },
  observations: {
    type: String,
    trim: true,
  },
  next: {
    type: Date,
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
});

module.exports = mongoose.model("Hisopado", HisopadoSchema);
