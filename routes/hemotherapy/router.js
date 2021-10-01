const router = require("express").Router();

// Redirecting to different routes
router.use("/application", require("./application"));

// Export API routes
module.exports = router;
