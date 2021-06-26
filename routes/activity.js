const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs-extra");
const auth = require("../middleware/auth");
const activityController = require("../controllers/activityController");

var storage = multer.diskStorage({
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

var upload = multer({ storage: storage });

// api/auth
router.post("/", auth, activityController.addActivity);

router.post(
  "/:id",
  auth,
  upload.single("medical_referral"),
  (req, res, next) => {
    return res.json({
      msg: "Succes",
    });
  }
);

router.get("/", auth, activityController.getActivity);

module.exports = router;
