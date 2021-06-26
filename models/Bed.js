const mongoose = require("mongoose");

const BedSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  sector: {
    type: Number,
    required: true,
  },
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
  },
});

module.exports = mongoose.model("Bed", BedSchema);
