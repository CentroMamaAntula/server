const ReportRx = require("../models/ReportRx");
const OrderRx = require("../models/OrderRx");
const fs = require("fs-extra");
var path = require("path");
const { validationResult } = require("express-validator");
const { Storage } = require("@google-cloud/storage");
const role = require('../utils/role')

// Creates a client
const storage = new Storage({
  projectId: "mamantulahc",
  keyFilename: "./mamantulahc-65c178ca86ed.json",
});

exports.addReportRx = async (req, res) => {
  if (req.user.role === role.RAYOS) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const orderRx = await OrderRx.findById(req.body.id_order);
      if (!orderRx) {
        return res.status(400).json({ msg: "No existe orderRx" });
      }
      var reportRx = new ReportRx(req.body);

      if (reportRx.extension !== "") {
        await storage
          .bucket("mamantulahc.appspot.com")
          .upload(
            path.join(
              __dirname +
                "/uploads/" +
                reportRx.plate +
                "." +
                reportRx.extension
            ),
            {
              gzip: true,
              metadata: {
                cacheControl: "public, max-age=31536000",
              },
            }
          );
        fs.remove(
          path.join(
            __dirname + "/uploads/" + reportRx.plate + "." + reportRx.extension
          )
        );
      }
      await reportRx.save();
      res.json(reportRx);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } else {
    res.status(500).send("Hubo un error");
  }
};

exports.getReportRx = async (req, res) => {
  const { id_orderRx } = req.query;
  try {
    const orderRx = await OrderRx.findById(id_orderRx);
    if (!orderRx) {
      return res.status(400).json({ msg: "No existe orderRx" });
    }
    let reportRx = await ReportRx.findOne({
      id_order: orderRx._id,
    }).populate("professional_name", "name");
    res.json(reportRx);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
