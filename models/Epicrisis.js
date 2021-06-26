const mongoose = require("mongoose");

const EpicrisisSchema = mongoose.Schema({
  date_admission: {
    type: Date,
    require: true,
  },
  date_egress: {
    type: Date,
    require: true,
  },
  treatment: {
    type: String,
    trim: true,
  },
  treatment_outpatient: {
    type: String,
    trim: true,
  },
  observations: {
    type: String,
    trim: true,
  },
  id_activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    required: true,
  },
});

module.exports = mongoose.model("Epicrisis", EpicrisisSchema);
