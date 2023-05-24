var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userEmail: { type: String },
});

var Model = mongoose.model("users", userSchema);
module.exports = Model;
