var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cartSchema = new Schema({

    customer_id: {
        type: String,
        required: false
    },
    product_id: {
        type: String,
        required: false
    },
    product_sku: {
        type: String,
        required: false
    },
    product_image: {
        type: String,
        required: false
    },
    product_name: {
        type: String,
        required: false
    },
    product_price: {
        type: String,
        required: false
    },
    product_qty: {
        type: String,
        required: false
    },
    product_weight:{
        type:String,
        required:false
    },
    grand_total: {
        type: String,
        required: false
    },
    customer_email: {
        type: String,
        required: false
    },
    customer_firstname: {
        type: String,
        required: false
    },
    customer_lastname: {
        type: String,
        required: false
    },
    subtotal: {
        type: String,
        required: false
    },
     base_subtotal_with_discount: {
        type: String,
        required: false
    }
   
    
});


module.exports = mongoose.model('cart', cartSchema);