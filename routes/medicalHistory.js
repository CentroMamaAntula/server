const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const medicalHistoryController = require("../controllers/medicalHistoryController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  medicalHistoryController.addMedicalHistory
);

router.get("/", auth, medicalHistoryController.getMedicalHistory);

router.put("/:id", auth, medicalHistoryController.updateMedicalHistory);

module.exports = router;
