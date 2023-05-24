const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const routes = require("./routing/route")

mongoose.connect("mongodb+srv://majidalam13839:majid@cluster0.ra334no.mongodb.net/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('database is connected sucessfully');
// });

db.once("connected", () => {
  // show messsage when connected to database
  console.log("Database connected successfully");
});
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
