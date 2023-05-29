var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fristName: { type: String },
    Fathername: { type: String },
    email: { type: String },
    password: { type: String },
    conformPassword: { type: String },
    phoneNumber: { type: String },
    // image: {type: String},
    // url: {type: String}

});

var Model = mongoose.model("users", userSchema);
module.exports = Model;
