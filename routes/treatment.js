const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const treatmentController = require("../controllers/treatmentController");

router.post(
  "/",
  auth,
  [
    check("name", "El nombre del paciente es obligatorio").notEmpty(),
    check("type", "El nombre del paciente es obligatorio").notEmpty(),
    check(
      "professional_name",
      "El nombre del paciente es obligatorio"
    ).notEmpty(),
    check("id_paciente", "El nombre del paciente es obligatorio").notEmpty(),
  ],
  treatmentController.addTreatment
);

router.get("/", auth, treatmentController.getTreatments);

module.exports = router;
