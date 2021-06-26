const OrderRx = require("../models/OrderRx");
const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

/* 1: medico, 2: enfermero, 3: salud mental 4: rayos*/

exports.addOrderRx = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  try {
    const paciente = await Paciente.findById(req.body.id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe Paciente" });
    }
    const orderRx = new OrderRx(req.body);
    await orderRx.save();
    res.json(orderRx);
  } catch (e) {
    console.log(e);
    res.status(500).send("Hubo un error");
  }
};

exports.getOrderRxPaciente = async (req, res) => {
  const { id_paciente, limit = 10, page = 1 } = req.query;
  try {
    const orderRx = await OrderRx.find({ id_paciente })
      .sort({ date: 1, state: 1, urgent: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    if (!orderRx) {
      return res.status(400).json({ msg: "No existe Pedido Rx" });
    }
    res.json(orderRx);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.getOrderRx = async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  try {
    const orderRx = await OrderRx.find()
      .sort({ state: 1, urgent: -1, date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("id_paciente")
      .populate("professional_name", "name")
      .exec();
    if (!orderRx) {
      return res.status(400).json({ msg: "No existe Pedido Rx" });
    }
    const count = await OrderRx.countDocuments();
    const totalPages = Math.ceil(count / 5);
    const currentPage = page;
    const total = count;

    res.json({ orderRx, totalPages, currentPage, total });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.editOrderRx = async (req, res) => {
  const { id } = req.params;
  const newOrder = new OrderRx(req.body);
  try {
    const orderRx = await OrderRx.findByIdAndUpdate(id, newOrder, {
      new: true,
    }).populate("id_paciente");
    if (!orderRx) {
      return res.status(400).json({ msg: "No existe Pedido Rx" });
    }
    res.json(orderRx);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
