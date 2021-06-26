const router = require("express").Router();

// Redirecting to different routes
router.use("/activity", require("./activity"));

// Export API routes
module.exports = router;
