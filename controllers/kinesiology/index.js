const EvolutionKine = require("../../models/EvolutionKine");
const EvolutionMV = require("../../models/EvolutionMV");

exports.getKinesiology = async (req, res) => {
  try {
    let count = 0;
    const { id_paciente } = req.query;
    let evolution = await EvolutionKine.find({ id_paciente: id_paciente })
      .sort({ date: -1 })
      .limit(5)
      .populate("professional_name", "name")
      .exec();
    count = await EvolutionKine.countDocuments({ id_paciente: id_paciente });
    evolution = {
      evolutions: [...evolution],
      totalPages: Math.ceil(count / 5),
      currentPage: 1,
      total: count,
    };

    let evolutionMV = await EvolutionMV.find({ id_paciente: id_paciente })
      .sort({ date: -1 })
      .limit(3)
      .populate("professional_name", "name")
      .exec();
    count = await EvolutionMV.countDocuments({ id_paciente: id_paciente });
    evolutionMV = {
      evolutionMVs: [...evolutionMV],
      totalPages: Math.ceil(count / 3),
      currentPage: 1,
      total: count,
    };

    res.json({
      evolution,
      evolutionMV,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
