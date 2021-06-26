const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const evolutionController = require("../../controllers/nutrition/evolutionController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  evolutionController.addEvolutionNut
);

router.get("/", auth, evolutionController.getEvolutionNut);

module.exports = router;
