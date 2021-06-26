const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const historyCurrentController = require("../controllers/historyCurrentController");

router.post(
  "/",
  auth,
  [
    check(
      "professional_name",
      "El nombre del paciente es obligatorio"
    ).notEmpty(),
    check("id_paciente", "El nombre del paciente es obligatorio").notEmpty(),
  ],
  historyCurrentController.addHistoryCurrent
);

router.get("/", auth, historyCurrentController.getHistoryCurrents);

module.exports = router;
