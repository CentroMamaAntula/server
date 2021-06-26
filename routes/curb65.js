const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const curb65Controller = require("../controllers/curb65Controller");

// api/auth
router.post(
  "/",
  auth,
  [
    check("confusion", "confusion es obligatorio").notEmpty(),
    check("urea", "urea es obligatorio").notEmpty(),
    check("breathing", "breathing es obligatorio").notEmpty(),
    check("systolic_blood_pressure", "PA sistolica es obligatorio").notEmpty(),
    check(
      "diastolic_blood_pressure",
      "PA diastolica es obligatorio"
    ).notEmpty(),
    check("value", "value es obligatorio").notEmpty(),
    check("id_paciente", "El nombre del paciente es obligatorio").notEmpty(),
  ],
  curb65Controller.addCURB65
);

router.get("/", auth, curb65Controller.getCURB65);

module.exports = router;
