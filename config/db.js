const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("==============");
    console.log("  DB Connect");
    console.log("==============");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;