const HistoryCurrent = require("../models/HistoryCurrent");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addHistoryCurrent = async (req, res) => {
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
      const historyCurrent = new HistoryCurrent(req.body);
      await historyCurrent.save();
      res.json(historyCurrent);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getHistoryCurrents = async (req, res) => {
  const { id_paciente, limit = 3, page } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    let historyCurrent = await HistoryCurrent.find({ id_paciente: paciente._id })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("professional_name", "name")
      .exec();
    const count = await HistoryCurrent.countDocuments({ id_paciente: id_paciente });
    historyCurrent = {
      historyCurrents: [...historyCurrent],
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    };
    res.json(historyCurrent);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
