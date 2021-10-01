const Activity = require("../models/Activity");
const Paciente = require("../models/Paciente");
const fs = require("fs-extra");
var path = require("path");
const { validationResult } = require("express-validator");
const { Storage } = require("@google-cloud/storage");

// Creates a client
const storage = new Storage({
  projectId: "mamantulahc",
  keyFilename: "./mamantulahc-65c178ca86ed.json",
});

exports.addActivity = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const paciente = await Paciente.findById(req.body.id_paciente);
      if (!paciente) {
        return res.status(400).json({ msg: "No existe paciente" });
      }
      var activity = new Activity(req.body);

      if (activity.extension !== undefined) {
        await storage
          .bucket("mamantulahc.appspot.com")
          .upload(
            path.join(
              __dirname +
                "/uploads/" +
                activity.medical_referral +
                "." +
                activity.extension
            ),
            {
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              // By setting the option `destination`, you can change the name of the
              // object you are uploading to a bucket.
              metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: "public, max-age=31536000",
              },
            }
          );
        fs.remove(
          path.join(
            __dirname +
              "/uploads/" +
              activity.medical_referral +
              "." +
              activity.extension
          )
        );
      }
      activity.save().then(a => a.populate("bed").execPopulate());
      res.json(activity);
    } catch (e) {
      console.log(e);
      res.status(500).send("Hubo un error");
    }
  } catch (e) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getActivity = async (req, res) => {
  const { id_paciente, limit = 2, page = 1 } = req.query;
  try {
    const paciente = await Paciente.findById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ msg: "No existe paciente" });
    }
    let activity = await Activity.find({
      id_paciente: paciente._id,
    })
      .sort({
        date: -1,
      })
      .limit(limit * 1)
      .populate("bed")
      .skip((page - 1) * limit)
      .exec();
    const count = await Activity.countDocuments({
      id_paciente: id_paciente,
    });
    activity = {
      activitys: [...activity],
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    };
    res.json(activity);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
