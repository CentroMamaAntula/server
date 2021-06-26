const mongoose = require("mongoose");

const MentalEvolutionSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: new Date().toLocaleDateString(),
  },
  evolution: {
    type: String,
    required: true,
    trim: true,
  },
  indications: {
    type: String,
    required: true,
    trim: true,
  },
  professional_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id_mentalquery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MentalQuery",
    required: true,
  },
});

module.exports = mongoose.model("MentalEvolution", MentalEvolutionSchema);
