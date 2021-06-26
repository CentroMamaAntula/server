const router = require("express").Router();

// Redirecting to different routes
router.use("/", require("./index"));
router.use("/evolution", require("./evolution"));
router.use("/mechanic_ventilation", require("./evolutionMV"));

// Export API routes
module.exports = router;
