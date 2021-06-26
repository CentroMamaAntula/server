const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const hisopadoController = require("../controllers/hisopadoController");

// api/auth
router.post(
  "/",
  auth,
  [
    check("sample", "El nombre del paciente es obligatorio").notEmpty(),
    check("result", "El nombre del paciente es obligatorio").notEmpty(),
    check("id_paciente", "El nombre del paciente es obligatorio").notEmpty(),
  ],
  hisopadoController.addHisopado
);

router.get("/", auth, hisopadoController.getHisopados);

router.put("/:id", auth, hisopadoController.updateHisopado);

module.exports = router;
