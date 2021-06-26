const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const mentalQueryController = require("../controllers/mentalQueryController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  mentalQueryController.addMentalQuery
);

router.get("/", auth, mentalQueryController.getMentalQuery);

module.exports = router;
