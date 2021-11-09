const Activity = require("../../models/Activity");
const MentalEvolution = require("../../models/MentalEvolution");
const MentalQuery = require("../../models/MentalQuery");
const Paciente = require("../../models/Paciente");
const { validationResult } = require("express-validator");

const MODEL = {
  Activity,
  MentalEvolution,
  MentalQuery
};
const POPULATE = {
  Activity: 'id_paciente',
  MentalEvolution: 'id_mentalquery',
  MentalQuery: 'id_paciente'
};

exports.getActivityFromTo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const { model, type = undefined, from, to } = req.query;

      const oneDay = 24 * 60 * 60 * 1000;
      const activities = await MODEL[model].find({
        date: {
          $gt: new Date(from).getTime(),
          $lte: new Date(to).getTime() + oneDay,
        },
        type,
      })
        .sort({
          date: 1,
        })
        .populate(POPULATE[model])
        .exec();
      res.json(activities);
    } catch (error) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.getActivityPaciente = async (req, res) => {
  const { id_paciente } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    const activities = await Activity.find({
      id_paciente: paciente._id,
    })
      .sort({
        date: -1,
      })
      .populate("professional_name", "name")
      .exec();

    res.json(activities);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
