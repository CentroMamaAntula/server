const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const statisticsController = require("../../controllers/statistics/statisticsController");

// api/auth
/* router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  evolutionController.addEvolutionNut
); */

router.get(
  "/",
  auth,
  [check("model", "El tipo es obligatorio").notEmpty()],
/*   [check("type", "El tipo es obligatorio").notEmpty()],
 */  [check("from", "Fecha desde es obligatorio").notEmpty()],
  [check("to", "Fecha hasta es obligatorio").notEmpty()],
  statisticsController.getActivityFromTo
);

router.get("/patient", auth, statisticsController.getActivityPaciente);

module.exports = router;
