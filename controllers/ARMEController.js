const ARME = require("../models/ARME");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addARME = async (req, res) => {
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
      const arme = new ARME(req.body);
      await arme.save();
      res.json(arme);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getARME = async (req, res) => {
  const { id_paciente, limit = 5, page = 1 } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    let arme = await ARME.find({
      id_paciente: paciente._id,
    })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("id_nurse", "name")
      .exec();

    const count = await ARME.countDocuments({
      id_paciente: id_paciente,
    });

    arme = {
      armes: [...arme],
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    };
    res.json(arme);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
