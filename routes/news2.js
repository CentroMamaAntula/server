const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const news2Controller = require("../controllers/news2Controller");

// api/auth
router.post(
  "/",
  auth,
  [
    check(
      "breathing_frequency",
      "breathing_frequency es obligatorio"
    ).isNumeric(),
    check("o2_saturation", "o2_saturation es obligatorio").isNumeric(),
    check("epoc", "epoc es obligatorio").isBoolean(),
    check(
      "supplemental_oxygen",
      "Oxigeno suplementario es obligatorio"
    ).isBoolean(),
    check("systolic_blood_pressure", "PA sistolica es obligatorio").isNumeric(),
    check("heart_rate", "blood pressure es obligatorio").isNumeric(),
    check("conscience_level", "conscience_level es obligatorio").isBoolean(),
    check("temperature", "temperatura es obligatorio").isNumeric(),
    check("value", "value es obligatorio").isNumeric().notEmpty(),
    check("id_paciente", "El nombre del paciente es obligatorio").notEmpty(),
  ],
  news2Controller.addNEWS2
);

router.get("/", auth, news2Controller.getNEWS2);

module.exports = router;
