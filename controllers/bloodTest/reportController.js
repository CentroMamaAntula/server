const Report = require("../../models/bloodTest/ReportLab");
const Paciente = require("../../models/Paciente");
const { validationResult } = require("express-validator");

exports.addEvolution = async (req, res) => {
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
      let report = new Report(req.body);
      report.save().then( async (r, error) => {
        await r.populate("professional_name").execPopulate();
        res.json(report);
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getEvolution = async (req, res) => {
  const { id_paciente, limit = 10, page } = req.query;
  console.log(id_paciente)
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    let report = await Report.find({
      id_paciente: paciente._id,
    })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("professional_name", "name")
      .exec();
    const count = await Report.countDocuments({
      id_paciente: id_paciente,
    });
    report = {
      reports: [...report],
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    };
    res.json(report);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
