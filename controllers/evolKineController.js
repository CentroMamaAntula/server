const EvolutionKine = require("../models/EvolutionKine");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addEvolutionKine = async (req, res) => {
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
      const evolution = new EvolutionKine(req.body);
      await evolution.save();
      res.json(evolution);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getEvolutionKine = async (req, res) => {
  const { id_paciente, limit = 5, page = 1 } = req.query;
  console.log(req.query);
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    let evolution = await EvolutionKine.find({ id_paciente: paciente._id })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("professional_name", "name")
      .exec();
    const count = await EvolutionKine.countDocuments({
      id_paciente: id_paciente,
    });
    evolution = {
      evolutions: [...evolution],
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    };
    res.json(evolution);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
