const MentalQuery = require("../models/MentalQuery");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");
const role = require('../utils/role')

/* 1: medico, 2: enfermero, 3: salud mental*/

exports.addMentalQuery = async (req, res) => {
  if (req.user.role === role.SALUD_MENTAL) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const paciente = await Paciente.findById(req.body.id_paciente);
      if (!paciente) {
        return res.status(400).json({ msg: "No existe paciente" });
      }
      const mentalQuery = new MentalQuery(req.body);
      await mentalQuery.save();
      res.json(mentalQuery);
    } catch (e) {
      res.status(500).send("Hubo un error");
    }
  } else {
    res.status(500).send("Hubo un error");
  }
};

exports.getMentalQuery = async (req, res) => {
  const { id_paciente } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    let mentalQuery = [];
    if (req.user.role === role.SALUD_MENTAL) {
      mentalQuery = await MentalQuery.find({
        id_paciente: paciente._id,
      }).sort({
        date: -1,
      });
    } else if (req.user.role === role.MEDICO) {
      mentalQuery = await MentalQuery.find({
        id_paciente: paciente._id,
      })
        .sort({
          date: -1,
        })
        .select("date id_paciente _id");
    } else {
      return res.status(500).json({ msg: "Hubo un error" });
    }
    res.json(mentalQuery);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
