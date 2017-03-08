var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menu = new Schema({
     menu: {
         type : Array, required : false,
         },
});
module.exports = mongoose.model('menu', menu);
