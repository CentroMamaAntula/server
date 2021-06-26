const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs-extra");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const complementaryController = require("../controllers/complementaryController");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `./controllers/uploads/`;
    fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const fileName = file.fieldname + "-" + Date.now();
    cb(null, fileName);
  },
});

var upload = multer({ storage: storage });

// api/auth
router.post(
  "/",
  auth,
  upload.single("image"),
  complementaryController.addComplementaryStudies
);

router.get("/", auth, complementaryController.getComplementary);

module.exports = router;
