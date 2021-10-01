const router = require("express").Router();

// Redirecting to different routes
router.use("/auth", require("./auth"));
router.use("/bed", require("./bed"));
router.use("/news2", require("./news2"));
router.use("/curb65", require("./curb65"));
router.use("/paciente", require("./paciente"));
router.use("/hisopado", require("./hisopado"));
router.use("/activity", require("./activity"));
router.use("/diagnostic", require("./diagnostic"));
router.use("/treatment", require("./treatment"));
router.use("/mental_query", require("./mentalQuery"));
router.use("/physical_exam", require("./physicalExam"));
router.use("/studies", require("./complementaryStudies"));
router.use("/clinic_history", require("./clinicHistory"));
router.use("/medical_history", require("./medicalHistory"));
router.use("/mental_evolution", require("./mentalEvolution"));
router.use("/nursing", require("./nursing"));
router.use("/nursing_exam", require("./nursingExam"));
router.use("/arm_exam", require("./arme"));
router.use("/balance_exam", require("./balanceHE"));
router.use("/application", require("./application"));
router.use("/apache", require("./apache"));
router.use("/saps2", require("./saps2"));
router.use("/sofa", require("./sofa"));
router.use("/historyCurrent", require("./historyCurrent"));
router.use("/epicrisis", require("./epicrisis"));
router.use("/orderrx", require("./orderRx"));
router.use("/reportrx", require("./reportRx"));

router.use("/kinesiology", require("./kinesiology/router"));
router.use("/hemotherapy", require("./hemotherapy/router"));
router.use("/nutrition", require("./nutrition/router"));
router.use("/laboratory", require("./bloodTest/router"));
router.use("/statistics", require("./statistics/router"));

// Export API routes
module.exports = router;
