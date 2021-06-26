const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const CHController = require("../controllers/clinicHistoryController");

// api/clinic_history
router.get("/", auth, CHController.getClinicHistory);

module.exports = router;
