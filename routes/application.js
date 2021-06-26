const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const applicationsController = require("../controllers/applicationsController");

// api/application
router.post(
  "/",
  auth,
  [check("id_treatment", "El id del tratamiento es obligatorio").notEmpty()],
  applicationsController.addApplications
);

router.get("/", auth, applicationsController.getApplications);

module.exports = router;
