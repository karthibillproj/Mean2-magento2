var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    entityId: {
        type : Number, required : true, unique: true
        },
    name: {
        type : String, required : false,
        trim: true
        },
    isActive: {
        type : Number, required : false,
        },
    image: {
        type : String, required : false,
        },
	include_in_menu:{
		type : Number, required : false,
	},
	description:{
		type : String, required : false,
        trim: true
	},
	displayMode:{
		type : String, required : true,
	},
	identifier:{
		type : String, required : false,
        trim: true
	},
	filters: {
        type: Object, required: false
    }

});

module.exports = mongoose.model('category', categorySchema);
