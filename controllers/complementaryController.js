const ComplementaryStudies = require("../models/ComplementaryStudies");
const Paciente = require("../models/Paciente");
const fs = require("fs-extra");
const path = require("path");
const { validationResult } = require("express-validator");

exports.addComplementaryStudies = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const paciente = await Paciente.findById(req.body.id_paciente);
      if (!paciente) {
        return res.status(400).json({ msg: "No existe paciente" });
      }
      var complementaryStudies = new ComplementaryStudies(req.body);
      complementaryStudies.result = fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      );
      fs.remove(path.join(__dirname + "/uploads/" + req.file.filename));
      await complementaryStudies.save();
      res.json({ complementaryStudies });
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getComplementary = async (req, res) => {
  const { id_paciente } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    const complementaryStudies = await ComplementaryStudies.find({
      id_paciente: paciente._id,
    }).sort({
      date: 1,
    });
    res.json({ complementaryStudies });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
