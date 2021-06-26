const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const evolMVController = require("../../controllers/kinesiology/evolMVController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  evolMVController.addEvolutionMV
);

router.get("/", auth, evolMVController.getEvolutionMV);

module.exports = router;
