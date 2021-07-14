const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
global["XMLHttpRequest"] = require("xmlhttprequest").XMLHttpRequest;

const app = express();

//db
connectDB();

//allow cors
app.use(cors())

//
app.use(express.json({ extend: true }));
app.set("view engine", "ejs");

//routes
app.use('/api',require('./routes/router'));

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || "0.0.0.0";

app.listen(server_port, server_host, () => {
  console.log(
    `El servidor esta funcionando en el puerto ${server_port}, en el servidor ${server_host}`
  );
});
