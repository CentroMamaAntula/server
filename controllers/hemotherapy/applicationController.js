const Application = require("../../models/hemotherapy/Application");
const Paciente = require("../../models/Paciente");
const { validationResult } = require("express-validator");

exports.addApplication = async (req, res) => {
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
      let application = new Application(req.body);
      application.save().then( async ( result, error ) => {
        await result.populate("professional_name").execPopulate();
        res.json(result);
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

exports.getApplication = async (req, res) => {
  const { id_paciente, limit = 10, page = 1 } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    let application = await Application.find({
      id_paciente: paciente._id,
    })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("professional_name", "name")
      .exec();
    const count = await Application.countDocuments({
      id_paciente: id_paciente,
    });
    application = {
      applications: [...application],
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    };
    res.json(application);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
