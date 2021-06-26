const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const nursingController = require("../controllers/nursingController");

// api/clinic_history
router.get("/", auth, nursingController.getNursing);

module.exports = router;
