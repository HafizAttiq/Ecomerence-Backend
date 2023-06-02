var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userAdminSchema = new Schema({
    // fristName: { type: String },
    // Fathername: { type: String },
    email: { type: String },
    password: { type: String },
    // conformPassword: { type: String },
    // phoneNumber: { type: String }

});

var adminModel = mongoose.model("AdminSchema", userAdminSchema);
module.exports = adminModel;