const mongoose = require("mongoose");

module.exports = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  sub: [
    {
      name: {type: String, required: true}, 
      description: {type: String, required: true}, 
      value: {type: mongoose.Schema.Types.Mixed}, 
      disabled: {type: Boolean}, 
      unit: {type: String}, 
      reference_values: {type: mongoose.Schema.Types.Array}, 
  }]
});

