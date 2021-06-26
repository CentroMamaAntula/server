const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const epicrisisController = require("../controllers/epicrisisController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  epicrisisController.addEpicrisis
);

router.get("/", auth, epicrisisController.getEpicrisis);

module.exports = router;
