const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
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
  id_treatment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Treatment",
    required: true,
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
