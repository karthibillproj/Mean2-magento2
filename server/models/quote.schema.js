var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var quoteSchema = new Schema({

    customer_id: {
        type: String,
        required: false
    },
    created_at: {
        type: String,
        required: false
    },
    updated_at: {
        type: String,
        required: false
    },
    items_count: {
        type: String,
        required: false
    },
    items_qty: {
        type: String,
        required: false
    },
    grand_total: {
        type: String,
        required: false
    },
    customer_group_id: {
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
   customer_is_guest: {
    type:String,
    required:false
   },
   coupon_code: {
    type: String,
    required:false
   },
   subtotal_with_discount :{
    type:String,
    required:false
   }
    
});


module.exports = mongoose.model('quote', quoteSchema);