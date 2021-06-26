const mongoose = require("mongoose");

const BalanceHESchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  gout: {
    type: String,
    trim: true,
  },
  jar: {
    type: String,
    trim: true,
  },
  typeP: {
    type: String,
    trim: true,
  },
  start: {
    type: Number,
    trim: true,
  },
  end: {
    type: Number,
    trim: true,
  },
  typeE: {
    type: String,
    trim: true,
  },
  cant: {
    type: Number,
    trim: true,
  },
  diet: {
    type: String,
    trim: true,
  },
  sng: {
    type: String,
    trim: true,
  },
  vosolution: {
    type: String,
    trim: true,
  },
  diuresis: {
    type: String,
    trim: true,
  },
  sngE: {
    type: String,
    trim: true,
  },
  lu: {
    type: String,
    trim: true,
  },
  loquios: {
    type: String,
    trim: true,
  },
  heces: {
    type: String,
    trim: true,
  },
  drains: {
    type: String,
    trim: true,
  },
  observations: {
    type: String,
    trim: true,
  },
  id_nurse: {
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

module.exports = mongoose.model("BalanceHE", BalanceHESchema);
