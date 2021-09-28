const Diagnostic = require("../models/Diagnostic");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addDiagnostic = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const paciente = await Paciente.findById(req.body.id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    const diagnostic = new Diagnostic(req.body);
    await diagnostic.save();
    res.json(diagnostic);
  } catch (e) {
    console.log(e);
    res.status(500).send("Hubo un error");
  }
};

exports.getDiagnostic = async (req, res) => {
  const { id_paciente, limit = 2, page = 1 } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    const diagnostics = await Diagnostic.find({
      id_paciente: paciente._id,
    })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("professional_name", "name")
      .exec();
    const count = await Diagnostic.countDocuments({
      id_paciente: id_paciente,
    });
    const totalPages = Math.ceil(count / limit);
    const currentPage = page;
    const total = count;

    const diagnostic = { diagnostics, totalPages, currentPage, total };
    res.json(diagnostic);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
