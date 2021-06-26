const router = require("express").Router();

// Redirecting to different routes
router.use("/", require("./report"));

// Export API routes
module.exports = router;
