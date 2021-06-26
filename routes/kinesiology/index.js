const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Kinesiology = require("../../controllers/kinesiology");

// api/clinic_history
router.get("/", auth, Kinesiology.getKinesiology);

module.exports = router;
