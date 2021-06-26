const mongoose = require("mongoose");

const ReportRxSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  diagnostic: {
    type: String,
    required: true,
    trim: true,
  },
  plate: {
    type: String,
    required: true,
    trim: true,
  },
  extension: {
    type: String,
    required: true,
    trim: true,
  },
  professional_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id_order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderRx",
    required: true,
  },
});

module.exports = mongoose.model("ReportRx", ReportRxSchema);
