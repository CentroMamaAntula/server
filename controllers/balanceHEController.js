const BalanceHE = require("../models/BalanceHE");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.addBalanceHE = async (req, res) => {
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
      const balanceHE = new BalanceHE(req.body);
      await balanceHE.save();
      res.json(balanceHE);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getBalanceHE = async (req, res) => {
  const { id_paciente, limit = 5, page = 1 } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    let balanceHE = await BalanceHE.find({
      id_paciente: paciente._id,
    })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("id_nurse", "name")
      .exec();

    const count = await BalanceHE.countDocuments({
      id_paciente: id_paciente,
    });

    balanceHE = {
      balanceHEs: [...balanceHE],
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    };

    res.json(balanceHE);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
