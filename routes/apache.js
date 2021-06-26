const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const apacheController = require("../controllers/apacheController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  apacheController.addAPACHE
);

router.get("/", auth, apacheController.getAPACHE);

module.exports = router;
