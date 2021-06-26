const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const nursingExamController = require("../controllers/nursingExamController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  nursingExamController.addNursingExam
);

router.get("/", auth, nursingExamController.getNursingExam);

module.exports = router;
