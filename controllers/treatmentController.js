const Treatment = require("../models/Treatment");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addTreatment = async (req, res) => {
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
      const treatment = new Treatment(req.body);
      await treatment.save();
      res.json(treatment);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getTreatments = async (req, res) => {
  const { id_paciente, limit = 5, page } = req.query;
  console.log(req.query);
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    let treatment = await Treatment.find({ id_paciente: paciente._id })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("professional_name", "name")
      .exec();

    const count = await Treatment.countDocuments({ id_paciente: id_paciente });

    treatment = {
      treatments: [...treatment],
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    };
    res.json(treatment);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
