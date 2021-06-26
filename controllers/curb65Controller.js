const CURB65 = require("../models/CURB65");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addCURB65 = async (req, res) => {
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
      const curb65 = new CURB65(req.body);
      await curb65.save();
      res.json(curb65);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getCURB65 = async (req, res) => {
  const { id_paciente, limit = 3, page = 1 } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    const curb65 = await CURB65.find({ id_paciente: paciente._id })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await CURB65.countDocuments({ id_paciente: id_paciente });
    const totalPages = Math.ceil(count / limit);
    const currentPage = page;
    const total = count;

    res.json({ curb65, totalPages, currentPage, total });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
