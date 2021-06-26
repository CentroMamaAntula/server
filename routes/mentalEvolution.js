const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const mentalEvolutionController = require("../controllers/mentalEvolutionController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_mentalquery", "El nombre del paciente es obligatorio").notEmpty()],
  mentalEvolutionController.addMentalEvolution
);

router.get("/", auth, mentalEvolutionController.getMentalEvolution);

module.exports = router;
