var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var userStoreSchema = new Schema({
   userId:{ type : String},

   mainBanner: {
    images: [{
        url:{type:String}
     }]
   },
   rightBanner:{
   images: [{
       url:{type:String}
    }]
   }

});

var Model = mongoose.model("store", userStoreSchema);
module.exports = Model;
