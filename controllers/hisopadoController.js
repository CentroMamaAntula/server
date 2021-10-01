const Hisopado = require("../models/Hisopado");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addHisopado = async (req, res) => {
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
      const hisopado = new Hisopado(req.body);
      await hisopado.save();
      res.json(hisopado);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.updateHisopado = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { id } = req.params;
    const updateHisopado = req.body;
    try {
      const newHisopado = await Hisopado.findByIdAndUpdate(id, updateHisopado, {
        new: true,
      });
      if (!newHisopado) {
        return res.json({ msg: "No existe" });
      }
      res.json(newHisopado);
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: "Hubo un error" });
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getHisopados = async (req, res) => {
  const { id_paciente, limit = 2, page = 1 } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    let hisopado = await Hisopado.find({ id_paciente: paciente._id })
      .sort({
        date: 1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Hisopado.countDocuments({
      id_paciente: id_paciente,
    });
    hisopado = {
      hisopados: [...hisopado],
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    };
    res.json(hisopado);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
