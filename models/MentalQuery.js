const mongoose = require("mongoose");

const MentalQuerySchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: new Date().toLocaleDateString(),
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  background: {
    type: String,
    required: true,
    trim: true,
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
});

module.exports = mongoose.model("MentalQuery", MentalQuerySchema);
