const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const ARMEController = require("../controllers/ARMEController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  ARMEController.addARME
);

router.get("/", auth, ARMEController.getARME);

module.exports = router;
