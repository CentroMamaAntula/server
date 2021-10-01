const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../../middleware/auth");
const applicationController = require("../../controllers/hemotherapy/applicationController");

router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  applicationController.addApplication
);

router.get("/", auth, applicationController.getApplication);

module.exports = router;
