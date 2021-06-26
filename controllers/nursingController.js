const NursingExam = require("../models/NursingExam");
const BalanceHE = require("../models/BalanceHE");
const ARME = require("../models/ARME");

exports.getNursing = async (req, res) => {
  try {
    let count = 0;
    const { id_paciente } = req.query;
    let nursingExam = await NursingExam.find({ id_paciente: id_paciente })
      .sort({ date: 1 })
      .limit(5)
      .populate("id_nurse", "name")
      .exec();
    count = await NursingExam.countDocuments({ id_paciente: id_paciente });

    nursingExam = {
      nursingExams: [...nursingExam],
      totalPages: Math.ceil(count / 5),
      currentPage: 1,
      total: count,
    };

    let balanceHE = await BalanceHE.find({ id_paciente: id_paciente })
      .sort({ date: 1 })
      .limit(5)
      .populate("id_nurse", "name")
      .exec();
    count = await BalanceHE.countDocuments({ id_paciente: id_paciente });

    balanceHE = {
      balanceHEs: [...balanceHE],
      totalPages: Math.ceil(count / 5),
      currentPage: 1,
      total: count,
    };

    let arme = await ARME.find({ id_paciente: id_paciente })
      .sort({ date: 1 })
      .limit(5)
      .populate("id_nurse", "name")
      .exec();
    count = await ARME.countDocuments({ id_paciente: id_paciente });

    arme = {
      armes: [...arme],
      totalPages: Math.ceil(count / 5),
      currentPage: 1,
      total: count,
    };

    res.json({
      nursingExam,
      balanceHE,
      arme,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
