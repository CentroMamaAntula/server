const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const physicalExamController = require("../controllers/physicalExamController");

router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  physicalExamController.addPhysicalExam
);

router.get("/", auth, physicalExamController.getPhysicalExam);

module.exports = router;
