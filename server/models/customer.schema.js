var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
    id : {
      type : Number, required: true, unique: true
    },
    firstname : {
      type : String, required: true, trim: true
    },
    lastname : {
      type : String, required: true, trim: true
    },
    email : {
      type : String, required: true, trim: true
    },
    customertoken : {
      type : String
    }
    /*,
    quoteid : {
     type : Number, required: true, unique: true
    }*/
});
module.exports = mongoose.model('customer', customerSchema);
