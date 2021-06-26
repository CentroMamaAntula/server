const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const sapsController = require("../controllers/sapsController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  sapsController.addSAPS
);

router.get("/", auth, sapsController.getSAPS);

module.exports = router;
