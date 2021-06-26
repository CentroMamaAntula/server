const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const multer = require("multer");
const fs = require("fs-extra");
const auth = require("../middleware/auth");
const reportRxController = require("../controllers/reportRxController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `./controllers/uploads/`;
    fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const fileName = req.params.id + "." + file.originalname.split(".").pop();
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// api/auth
router.post(
  "/",
  auth,
  [
    check("diagnostic", "Agrega un diagnostico valido").notEmpty(),
    check("plate", "El nombre del paciente es obligatorio").notEmpty(),
    check("extension", "El nombre del paciente es obligatorio").notEmpty(),
    check("id_order", "El nombre del paciente es obligatorio").notEmpty(),
  ],
  reportRxController.addReportRx
);

router.post(
  "/:id",
  auth,
  upload.single("plate"),
  (req, res, next) => {
    return res.json({
      msg: "Succes",
    });
  }
);

router.get("/", auth, reportRxController.getReportRx);

module.exports = router;
