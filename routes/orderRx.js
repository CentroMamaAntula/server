const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const orderRxController = require("../controllers/orderRxController");

// api/auth
router.post(
  "/",
  auth,
  [
    check("type", "Agrega un dni valido").notEmpty(),
    check("subtype", "El nombre del paciente es obligatorio").notEmpty(),
    check("urgent", "El nombre del paciente es obligatorio").notEmpty(),
    check("id_paciente", "El nombre del paciente es obligatorio").notEmpty(),
  ],
  orderRxController.addOrderRx
);

router.get("/", auth, orderRxController.getOrderRx);

router.get("/paciente", auth, orderRxController.getOrderRxPaciente);

router.put("/:id", auth, orderRxController.editOrderRx);

module.exports = router;
