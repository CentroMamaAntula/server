const router = require("express").Router();

// Redirecting to different routes
router.use("/evolution", require("./evolution"));

// Export API routes
module.exports = router;
