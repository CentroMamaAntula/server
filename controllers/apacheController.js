const APACHE = require("../models/APACHEII");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addAPACHE = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  try {
    const paciente = await Paciente.findById(req.body.id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    const apache = new APACHE(req.body);
    await apache.save();
    res.json(apache);
  } catch (e) {
    console.log(e);
    res.status(500).send("Hubo un error");
  }
};

exports.getAPACHE = async (req, res) => {
  const { id_paciente, limit = 3, page = 1 } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    const apache = await APACHE.find({ id_paciente: paciente._id })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await APACHE.countDocuments({ id_paciente: id_paciente });
    const totalPages = Math.ceil(count / limit);
    const currentPage = page;
    const total = count;

    res.json({ apache, totalPages, currentPage, total });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
