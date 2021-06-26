const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const diagnosticController = require("../controllers/diagnosticController");

router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  diagnosticController.addDiagnostic
);

router.get("/", auth, diagnosticController.getDiagnostic);

module.exports = router;
