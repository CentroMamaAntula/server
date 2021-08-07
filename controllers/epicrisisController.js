const Epicrisis = require("../models/Epicrisis");
const Activity = require("../models/Activity");
const { validationResult } = require("express-validator");
const role = require('../utils/role')

/* 1: medico, 2: enfermero, 3: salud mental*/

exports.addEpicrisis = async (req, res) => {
  if (req.user.role === role.MEDICO) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const activity = await Activity.findById(req.body.id_activity);
      if (!activity) {
        return res
          .status(400)
          .json({ msg: "No existe Consulta de Salud Mental" });
      }
      const epicrisis = new Epicrisis(req.body);
      await epicrisis.save();
      res.json(epicrisis);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } else {
    res.status(500).send("Hubo un error");
  }
};

exports.getEpicrisis = async (req, res) => {
  try {
    const activity = await Activity.findById(req.body.id_activity);
    if (!activity) {
      return res
        .status(400)
        .json({ msg: "No existe Consulta de Salud Mental" });
    }
    let epicrisis = [];
    if (req.user.role === role.MEDICO) {
      epicrisis = await Epicrisis.find({
        id_activity: activity._id,
      }).sort({
        date: 1,
      });
    } else {
      return res.status(500).json({ msg: "Hubo un error" });
    }
    res.json(epicrisis);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
