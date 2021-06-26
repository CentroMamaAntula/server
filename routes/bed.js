const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const bedController = require("../controllers/bedController");
const { check } = require("express-validator");

// api/bed
router.post(
  "/",
  auth,
  [
    check("number", "confusion es obligatorio").notEmpty(),
    check("sector", "urea es obligatorio").notEmpty(),
  ],
  bedController.addBed
);

router.get("/", auth, bedController.getBed);

router.get("/occupied_beds", auth, bedController.getOccupied);

router.get("/unoccupied_beds", auth, bedController.getUnoccupied);

router.put("/empty/:id_paciente", auth, bedController.emptyBed);

router.put("/occupy/:id", auth, bedController.updateBed);

module.exports = router;
