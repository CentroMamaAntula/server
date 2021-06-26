const Application = require("../models/Application");
const Treatment = require("../models/Treatment");
const { validationResult } = require("express-validator");

exports.addApplications = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const treatment = await Treatment.findById(req.body.id_treatment);

      if (!treatment) {
        return res.status(400).json({ msg: "No existe tratamiento" });
      }
      const application = new Application(req.body);
      await application.save();
      res.json(application);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getApplications = async (req, res) => {
  const { id_treatment } = req.query;
  try {
    const treatment = await Treatment.findById(id_treatment);
    if (!treatment) {
      return res.status(400).json({ msg: "No existe tratamiento" });
    }
    let application = await Application.find({
      id_treatment: treatment._id,
    })
      .sort({
        date: 1,
      })
      .populate("id_nurse", "name");

    res.json(application);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
