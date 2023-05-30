const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: "dyhqdbb3u",
  api_key: "713921627931967",
  api_secret: "bRDxp6Nul97uD6eLL7o_aCEjm2w"
});
const app = express();
const bodyParser = require("body-parser")
const port = 3000;
const routes = require("./routing/route")
const cors = require('cors');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose.connect("mongodb+srv://majidalam13839:majid@cluster0.ra334no.mongodb.net/mydb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', function () {
// //   console.log('database is connected sucessfully');
// // });

// db.once("connected", () => {
//   // show messsage when connected to database
//   console.log("Database connected successfully");
// });


mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('database is connected sucessfully');
});


app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
