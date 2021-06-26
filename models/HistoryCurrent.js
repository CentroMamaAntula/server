const mongoose = require("mongoose");

const HistoryCurrentSchema = mongoose.Schema({
  disease: {
    type: String,
    trim: true,
  },
  observations: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    require: true,
    trim: true,
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

module.exports = mongoose.model("HistoryCurrent", HistoryCurrentSchema);
