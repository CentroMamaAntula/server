const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const evolKineController = require("../../controllers/evolKineController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  evolKineController.addEvolutionKine
);

router.get("/", auth, evolKineController.getEvolutionKine);

module.exports = router;
