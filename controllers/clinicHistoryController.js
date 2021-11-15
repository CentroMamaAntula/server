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
    const { id_paciente, to = undefined, from = undefined, limit = 1000 } = req.query;
    let query = { id_paciente };
    const oneDay = 24 * 60 * 60 * 1000;
    let date = to ? {
      $lte: new Date(to).getTime() + oneDay,
    } : null;
    date = from ?
      date ? {
        $gt: new Date(from).getTime(),
        ...date,
      }
        : {
          $gt: new Date(from).getTime(),
          ...date,
        }
      : date;
    if (date) {
      query = {
        date,
        ...query,
      }
    }
    let treatment = await Treatment.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .populate("professional_name", "name")
      .exec();
    count = await Treatment.countDocuments(query);
    treatment = {
      treatments: [...treatment],
      totalPages: count > limit ? Math.ceil(count / limit) : 1,
      currentPage: 1,
      total: count,
    };

    let historyCurrent = await HistoryCurrent.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .populate("professional_name", "name")
      .exec();
    count = await HistoryCurrent.countDocuments(query);
    historyCurrent = {
      historyCurrents: [...historyCurrent],
      totalPages: count > limit ? Math.ceil(count / limit) : 1,
      currentPage: 1,
      total: count,
    };

    let physicalExam = await PhysicalExam.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .populate("professional_name", "name")
      .exec();
    count = await PhysicalExam.countDocuments(query);
    physicalExam = {
      physicalExams: [...physicalExam],
      totalPages: count > limit ? Math.ceil(count / limit) : 1,
      currentPage: 1,
      total: count,
    };

    let medicalHistory = await MedicalHistory.findOne({
      id_paciente: id_paciente,
    });

    let hisopado = await Hisopado.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .exec();
    count = await Hisopado.countDocuments(query);
    hisopado = {
      hisopados: [...hisopado],
      totalPages: count > limit ? Math.ceil(count / limit) : 1,
      currentPage: 1,
      total: count,
    };

    let activity = await Activity.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .populate("bed")
      .exec();
    count = await Activity.countDocuments(query);
    activity = {
      activitys: [...activity],
      totalPages: count > limit ? Math.ceil(count / limit) : 1,
      currentPage: 1,
      total: count,
    };

    let diagnostic = await Diagnostic.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .populate("professional_name", "name")
      .exec();
    count = await Diagnostic.countDocuments(query);
    diagnostic = {
      diagnostics: [...diagnostic],
      totalPages: count > limit ? Math.ceil(count / limit) : 1,
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
