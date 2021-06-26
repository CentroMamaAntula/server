const Treatment = require("../models/Treatment");
const HistoryCurrent = require("../models/HistoryCurrent");
const PhysicalExam = require("../models/PhysicalExam");
const MedicalHistory = require("../models/MedicalHistory");
const Hisopado = require("../models/Hisopado");
const Activity = require("../models/Activity");
const Diagnostic = require("../models/Diagnostic");

exports.getClinicHistory = async (req, res) => {
  try {
    let count = 0;
    const { id_paciente } = req.query;
    let treatment = await Treatment.find({ id_paciente: id_paciente })
      .sort({ date: -1 })
      .limit(5)
      .populate("professional_name", "name")
      .exec();
    count = await Treatment.countDocuments({ id_paciente: id_paciente });
    treatment = {
      treatments: [...treatment],
      totalPages: Math.ceil(count / 5),
      currentPage: 1,
      total: count,
    };

    let historyCurrent = await HistoryCurrent.find({ id_paciente: id_paciente })
      .sort({ date: -1 })
      .limit(3)
      .populate("professional_name", "name")
      .exec();
    count = await HistoryCurrent.countDocuments({ id_paciente: id_paciente });
    historyCurrent = {
      historyCurrents: [...historyCurrent],
      totalPages: Math.ceil(count / 3),
      currentPage: 1,
      total: count,
    };

    let physicalExam = await PhysicalExam.find({ id_paciente: id_paciente })
      .sort({ date: -1 })
      .limit(5)
      .populate("professional_name", "name")
      .exec();
    count = await PhysicalExam.countDocuments({ id_paciente: id_paciente });
    physicalExam = {
      physicalExams: [...physicalExam],
      totalPages: Math.ceil(count / 5),
      currentPage: 1,
      total: count,
    };

    let medicalHistory = await MedicalHistory.findOne({
      id_paciente: id_paciente,
    });

    let hisopado = await Hisopado.find({ id_paciente: id_paciente })
      .sort({ date: -1 })
      .limit(2)
      .exec();
    count = await Hisopado.countDocuments({ id_paciente: id_paciente });
    hisopado = {
      hisopados: [...hisopado],
      totalPages: Math.ceil(count / 2),
      currentPage: 1,
      total: count,
    };

    let activity = await Activity.find({ id_paciente: id_paciente })
      .sort({ date: -1 })
      .limit(2)
      .populate("bed")
      .exec();
    count = await Activity.countDocuments({ id_paciente: id_paciente });
    activity = {
      activitys: [...activity],
      totalPages: Math.ceil(count / 2),
      currentPage: 1,
      total: count,
    };

    let diagnostic = await Diagnostic.find({ id_paciente: id_paciente })
      .sort({ date: -1 })
      .limit(2)
      .populate("professional_name", "name")
      .exec();
    count = await Diagnostic.countDocuments({ id_paciente: id_paciente });
    diagnostic = {
      diagnostics: [...diagnostic],
      totalPages: Math.ceil(count / 2),
      currentPage: 1,
      total: count,
    };

    res.json({
      treatment,
      historyCurrent,
      physicalExam,
      medicalHistory,
      hisopado,
      activity,
      diagnostic,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
