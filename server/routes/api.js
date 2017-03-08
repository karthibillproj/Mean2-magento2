var db = require('../../lib/accessDB')
var util = require('util');

var Product = require('../../server/models/product.schema');

exports.productimport = function (req, res) {
    var productCount = 0;
    var response = req.body;
    for(var i = 0; i < response.length; i++){
        var product = new Product({
                    productid: response[i][0].id,
                    name: response[i][0].name,
                    sku: response[i][0].sku,
                    price: response[i][0].price,
                    image: response[i][0].image,
                    special_price: response[i][0].specialprice,
                    description: response[i][0].description,
                    stockstatus: response[i][0].stockstatus,
                    reviewscount: response[i][0].reviewscount,
                    overallrating: response[i][0].overallrating,
                    galleryimage: response[i][0].galleryimage,
                    reviews: response[i][0].reviews,
					isfeatured: response[i][0].is_featured,
                    upsell: response[i][0].upsell,
                    moreinformation: response[i][0].moreinformation,
                    categoryid : response[i][0].category_ids,
					filters : response[i][0].filterattributes
                });
        db.insertProduct(product, function(err) {
            if (err) {
                res.json({ success: false, message: 'Only ' + productCount + ' Products Syncronized.'  + ' Here is the Error: '+ err});
                console.log('Only ' + productCount + ' Products Syncronized.' + ' Here is the Error: '+ err);
            } else {
				productCount = productCount + 1;
                if (response.length==productCount) {
                    res.json({ success: true, message: productCount + ' Products Successfully Syncronized.'});
                    console.log( productCount + ' Products Successfully Syncronized.');
                }
            }
        });
    }
}
