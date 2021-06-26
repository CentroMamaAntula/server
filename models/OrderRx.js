const mongoose = require("mongoose");

const OrderRxSchema = mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: new Date().toLocaleDateString(),
  },
  type: {
    /* tx cc columna etc */
    type: String,
    required: true,
    trim: true,
  },
  subtype: {
    /* frente perfil oblicuo */
    type: String,
    required: true,
    trim: true,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  state: {
    /* completado o no */
    type: Boolean,
    default: false,
  },
  observations: {
    type: String,
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

module.exports = mongoose.model("OrderRx", OrderRxSchema);
