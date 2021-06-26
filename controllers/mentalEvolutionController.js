const MentalEvolution = require("../models/MentalEvolution");
const MentalQuery = require("../models/MentalQuery");
const { validationResult } = require("express-validator");

/* 1: medico, 2: enfermero, 3: salud mental*/

exports.addMentalEvolution = async (req, res) => {
  if (req.user.role === 3) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const mentalQuery = await MentalQuery.findById(req.body.id_mentalquery);
      if (!mentalQuery) {
        return res
          .status(400)
          .json({ msg: "No existe Consulta de Salud Mental" });
      }
      const mentalEvolution = new MentalEvolution(req.body);
      await mentalEvolution.save();
      res.json(mentalEvolution);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } else {
    res.status(500).send("Hubo un error");
  }
};

exports.getMentalEvolution = async (req, res) => {
  const { id_mentalquery } = req.query;
  console.log(id_mentalquery)
  try {
    const mentalQuery = await MentalQuery.findById(id_mentalquery);
    if (!mentalQuery) {
      return res
        .status(400)
        .json({ msg: "No existe Consulta de Salud Mental" });
    }
    let mentalEvolution;
    if (req.user.role === 3) {
      mentalEvolution = await MentalEvolution.find({
        id_mentalquery: mentalQuery._id,
      })
        .sort({
          date: -1,
        })
        .populate("professional_name", "name");
    } else if (req.user.role === 1) {
      mentalEvolution = await MentalEvolution.find({
        id_mentalquery: mentalQuery._id,
      })
        .sort({
          date: -1,
        })
        .select("date id_paciente _id")
        .populate("professional_name", "name");
    } else {
      return res.status(500).json({ msg: "Hubo un error" });
    }
    res.json(mentalEvolution);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
