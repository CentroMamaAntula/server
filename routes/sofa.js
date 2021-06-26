const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const sofaController = require("../controllers/sofaController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  sofaController.addSOFA
);

router.get("/", auth, sofaController.getSOFA);

module.exports = router;
