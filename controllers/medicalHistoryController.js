const MedicalHistory = require("../models/MedicalHistory");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addMedicalHistory = async (req, res) => {
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
      var medicalHistory = await MedicalHistory.findOne({
        id_paciente: paciente._id,
      });
      if (medicalHistory) {
        return res.status(400).json({ msg: "Ya existe" });
      }
      medicalHistory = new MedicalHistory(req.body);
      await medicalHistory.save();
      res.json(medicalHistory);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getMedicalHistory = async (req, res) => {
  const { id_paciente } = req.query;
  console.log(id_paciente);
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    const medicalHistory = await MedicalHistory.findOne({
      id_paciente: paciente._id,
    });
    res.json(medicalHistory);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.updateMedicalHistory = async (req, res) => {
  const { id } = req.params;
  const newMedicalHistory = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    var medicalHistory = await MedicalHistory.findByIdAndUpdate(
      id,
      newMedicalHistory,
      { new: true }
    );
    if (!medicalHistory) {
      return res.status(400).json({ msg: "No existe" });
    }
    res.json(medicalHistory);
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
