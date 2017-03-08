var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    special_price: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    image: {
        type: String,
        required: false
    },
    galleryimage: {
        type: Object,
        required: false
    },
    stockstatus: {
        type: String,
        required: false
    },
    reviewscount: {
        type: String,
        required: false
    },
    overallrating: {
        type: String,
        required: false
    },
    urlkey: {
        type: String,
        required: false
    },
    shortdescription: {
        type: String,
        required: false,
        trim: true
    },
    productid: {
        type: String,
        required: false
    },
    categoryid: {
        type: [Number],
        required: false
    },
    reviews: {
        type: Object,
        required: false
    },
	isfeatured:{
		type: Number,
        required: false
	},
    upsell: {
        type: Object,
        required: false
    },
    moreinformation: {
        type: Object,
        required: false
    },
	filters: {
        type: Object,
        required: false
    }
});


module.exports = mongoose.model('products', productSchema);
