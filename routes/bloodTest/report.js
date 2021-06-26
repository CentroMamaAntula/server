const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const reportController = require("../../controllers/bloodTest/reportController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  reportController.addEvolution
);

router.get("/", auth, reportController.getEvolution);

module.exports = router;
