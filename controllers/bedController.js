const Bed = require("../models/Bed");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addBed = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      var bed = new Bed(req.body);
      await bed.save();
      res.json(bed);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getBed = async (req, res) => {
  try {
    const bed = await Bed.find().populate("Paciente");
    res.json({ bed });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.getOccupied = async (req, res) => {
  try {
    const beds = await Bed.find({
      id_paciente: { $exists: true },
    })
      .populate("id_paciente")
      .sort({ number: 1 });
    res.json(beds);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.getUnoccupied = async (req, res) => {
  try {
    const beds = await Bed.find({
      id_paciente: { $exists: false },
    }).sort({ number: 1 });
    res.json(beds);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.updateBed = async (req, res) => {
  const { id } = req.params;
  const updateBed = req.body;
  try {
    const newBed = await Bed.findByIdAndUpdate(id, updateBed, { new: true });
    if (!newBed) {
      return res.status(404).json({ errors: "No existe" });
    }
    res.json(newBed);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Hubo un error" });
  }
};

exports.emptyBed = async (req, res) => {
  const { id_paciente } = req.params;
  try {
    const newBed = await Bed.findOne({ id_paciente });
    if (!newBed) {
      return res.status(404).json({ errors: "No existe" });
    }
    newBed.id_paciente = undefined;
    newBed.save();
    res.json(newBed);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Hubo un error" });
  }
};
