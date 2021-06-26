const mongoose = require("mongoose");

const PacienteSchema = mongoose.Schema({
  //dni _id
  dni: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  birthday: {
    type: Date,
    require: true,
  },
  domicile: {
    type: String,
    require: true,
    trim: true,
  },
  location: {
    type: String,
    require: true,
    trim: true,
  },
  job: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  family_phone: {
    type: Number,
    require: true,
  },
  social_coverage: {
    type: String,
    require: true,
  },
  internship: {
    type: Boolean,
    default: false,
  },
});

PacienteSchema.index({ "$**": "text" });

module.exports = mongoose.model("Paciente", PacienteSchema);
