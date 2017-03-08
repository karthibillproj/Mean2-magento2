var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cms = new Schema({
		cmsid: {
			type : String, required : true, unique: true
        },
		content: {
			type : String, required : true,
        },
		images: {
			type : Array, required : false,
		}
});
module.exports = mongoose.model('cms', cms);