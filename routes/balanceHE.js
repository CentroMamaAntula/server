const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const balanceHEController = require("../controllers/balanceHEController");

// api/auth
router.post(
  "/",
  auth,
  [check("id_paciente", "El nombre del paciente es obligatorio").notEmpty()],
  balanceHEController.addBalanceHE
);

router.get("/", auth, balanceHEController.getBalanceHE);

module.exports = router;
