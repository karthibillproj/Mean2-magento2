var db = require('../../lib/accessDB')
var util = require('util');

var MagentoBaseUrl = require('../../config/magentobaseurl.js');
var Cart = require('../../server/models/cart.schema');
var Quote = require('../../server/models/quote.schema');



exports.quotemagento = function(req, res) {

    //BOF Ankit for first time create cart
    client.cart.magentoquote().then(function(cartId) {
        if (cartId.length != 0) {
            console.log('cartId for cart API');
            console.log(cartId);
            var cartItem = {
                "cartItem": {
                    "sku": "24-MB01",
                    "qty": 5,
                    "quote_id": cartId
                }
            };


            client.cart.magentoquoteitem(cartItem, cartId).then(function(response) {


                var quoteId = cartId;

                client.cart.getCart(quoteId).then(function(quoteData) {
                    console.log('for Guest User First Time ****');

                    res.send(quoteData);


                });


            });


        }
    });
};

//BOF Ankit for second time create cart
exports.quoteitemmagento = function(req, res) {

    var cartId = 50;
    var cartItem = {
        "cartItem": {
            "sku": "24-MB02",
            "qty": 5,
            "quote_id": cartId
        }
    };

    var cartId = cartItem.cartItem.quote_id;


    client.cart.magentoquoteitem(cartItem, cartId).then(function(response) {

        var quoteId = response.quoteId;

        client.cart.getCart(quoteId).then(function(quoteData) {
            console.log('for Guest User second Time ****');

            res.send(quoteData);


        });




    });


};

//BOF Ankit registered Customer add to cart
exports.customerquotemagento = function(req, res) {
    var customertoken = req.body.customer_id;

    var quoteData = {
        "customer_id": customertoken,

    };
    customertoken = quoteData.customer_id;

    //customer token Found
    db.getCustomerByToken(customertoken, function(err, customer) {

        if (err) {
            console.log('*** customertfind err' + err);
        } else if (customer) {

            var customerId = customer.id; //need Customer Id from response

            client.cart.magentoquotecustomer(customerId).then(function(customerCartId) {
                if (customerCartId.length != 0) {

                    var cartItem = {
                        "cartItem": {
                            "sku": req.body.product_sku,
                            "qty": req.body.product_qty,
                            "quote_id": customerCartId
                        }
                    };


                    client.cart.magentoquoteitem(cartItem, customerCartId).then(function(response) {
                        var quoteId = response.quoteId;
                        res.send(response);



                    });


                }
            });
        } else {
            res.status(500).send("customer not found in mongodb");
        }

    }); //end




};

//BOF Billing Address for Cart post 
exports.billingmagento = function(req, res) {

    var quoteId = req.body.quote_id; // quote Id Required from Response
    var billingAddress = {
        "address": {
            "city": req.body.billing_data.city,
            "company": req.body.billing_data.company,
            "countryId": req.body.billing_data.country_id,
            "email": req.body.billing_data.email,
            "firstname": req.body.billing_data.firstname,
            "lastname": req.body.billing_data.lastname,
            "postcode": req.body.billing_data.postcode,
            "region": req.body.billing_data.region,
            "saveInAddressBook": 1,
            "street": [req.body.billing_data.street],
            "telephone": req.body.billing_data.telephone,
            "same_as_billing": req.body.billing_data.same_as_billing,

        }
    };
    //shipping address moved into billing due to new theme
    var shippingAddress = {
        "address": {
            "region": req.body.billing_data.region,
            "regionId": 43,
            "regionCode": "NY",
            "countryId": req.body.billing_data.country_id,
            "street": [
                req.body.billing_data.street,
            ],
            "telephone": req.body.billing_data.telephone,
            "city": req.body.billing_data.city,
            "firstname": req.body.billing_data.firstname,
            "lastname": req.body.billing_data.lastname,
            "postcode": req.body.billing_data.postcode
        }
    };


    client.cart.billing(billingAddress, quoteId).then(function(billingdata) {

        //shipping address moved into billing due to new theme
        client.cart.getshippingmethods(shippingAddress, quoteId, billingdata).then(function(shippingdata) {
            if (shippingdata.length != 0) {
                res.send(shippingdata);
            }
        });
        //res.send(billingdata);

    });

};
//BOF Ankit Shipping information magento
exports.shippinginformation = function(req, res) {
    var quoteId = req.body.quote_id;

    var shippingInformation = {
        "addressInformation": {
            "shippingAddress": {
                "region": req.body.addressInformation.region,
                "regionId": 43,
                "regionCode": "NY",
                "countryId": req.body.addressInformation.country_id,
                "street": [
                    req.body.addressInformation.street,
                ],
                "telephone": req.body.addressInformation.telephone,
                "postcode": req.body.addressInformation.postcode,
                "city": req.body.addressInformation.city,
                "firstname": req.body.addressInformation.firstname,
                "lastname": req.body.addressInformation.lastname,
                "saveInAddressBook": 1
            },
            "shippingMethodCode": req.body.shippingmethod.shippingmethod,
            "shippingCarrierCode": req.body.shippingmethod.shippingmethod
        }
    };


    client.cart.getshippingInformation(shippingInformation, quoteId).then(function(shippingInformationData) {
        if (shippingInformationData.length != 0) {
            res.send(shippingInformationData);
        }
    });
};

// BOF Ankit Shipping methods magento 
// DNE Code Commented due to shipping address moved into billing due to new theme

/*exports.shippingmethods = function(req, res) {

    var quoteId = 39;

    var shippingAddress =
                        {  
                            "address":{  
                                "region":"New York",
                                "regionId":43,
                                "regionCode":"NY",
                                "countryId":"US",
                                "street":[  
                                            "Main St"
                                         ],
                                "telephone":"64868564631",
                                "city":"New York",
                                "firstname":"Tom",
                                "lastname":"Sawyer",
                                "customerId":2,
                                "postcode":"10022"
                             }
                        };


    client.cart.getshippingmethods(shippingAddress, quoteId).then(function(shippingdata) {
        if (shippingdata.length != 0) {
            console.log(shippingdata);
            res.send(shippingdata);
        }
    });


};
*/




//BOF Ankit Order Place Magento
exports.orderinformation = function(req, res) {

    var quoteId = req.body.quote_id;

    var cartPayment = {
        "paymentMethod": {
            "method": req.body.payment_method.paymentmethod
        }
    };
    client.cart.orderPlaceMagento(cartPayment, quoteId).then(function(orderPlace) {
        res.send(orderPlace);

    });

};

exports.quotedetailsmagento = function(req, res) {

    var quoteId = req.query.quote_id;

    if (quoteId == "undefined" || quoteId == '') {
        res.status(500).send("quote id not found or undefined");

    } else {
        client.cart.getquoteDataMagento(quoteId).then(function(items) {
            var imageData = [];
            var arrayImage = [];
            var itemsData = items;
            var pData = itemsData;
            pData.forEach(function(proddata) {
                db.getProduct(proddata.sku, function(err, product) {

                    if (err) {
                        console.log('*** productfind err' + err);
                    } else {
                        imageData['itemId'] = proddata.itemId;
                        imageData['image'] = product.galleryimage[0].thumbnail;

                        arrayImage.push({
                            'itemId': imageData['itemId'],
                            'image': imageData['image']
                        });

                    }
                });
            });


            client.cart.getquoteTotalsMagento(quoteId, arrayImage).then(function(quoteTotals) {


                var json1 = [{
                    arrayImage
                }];


                var json2 = [{
                    quoteTotals
                }];
                var finalObj = json1.concat(json2);


                res.send(finalObj);

            });
        });
    }

};

//BOF Ankit Cart Delete
exports.cartdeletemagento = function(req, res) {

    var quoteId = req.query.quote_id;
    var itemId = req.query.item_id;

    client.cart.deleteCartItemMagento(quoteId, itemId).then(function(quotedeleted) {

        res.send(quotedeleted);

    });


};

//BOF Ankit Cart Update
exports.cartupdatemagento = function(req, res) {
    var quoteId = req.body.quote_id;
    var itemId = req.body.itemId;
    var qtyUpdated = req.body.qty;

    var cartItem = {
        "cartItem": {
            "itemId": itemId,
            "qty": qtyUpdated,
            "quoteId": quoteId
        }
    };


    client.cart.updateCartItemMagento(cartItem).then(function(updatecart) {
        res.send('true');

    });

};

//BOF Ankit Coupon Code Validation
exports.cartcouponmagento = function(req, res) {

    var couponCode = req.body.couponname;//'test123';
    console.log(couponCode);
    var quoteId = req.body.quote_id;
    client.cart.couponMagento(couponCode, quoteId).then(function(coupondata) {
        console.log('coupon code Applied Successfully!!!');
        console.log(coupondata);
       if(coupondata){
           console.log('success');
               var couponResponse = {
       
            "success": true,
            "isRemoved": false
            
        
    };
        res.send(couponResponse);
       }else{

                     var couponResponse = {
       
            "success": false,
            "isRemoved": false
            
        
    };
           
           res.send(couponResponse);
       }
       

    });

};


exports.deletecouponmagento = function(req, res) {

    var quoteId = req.body.quote_id;
    client.cart.deleteCoupon(quoteId).then(function(deletedcoupon) {
        console.log('coupon deleted successfully ');

          var couponResponse = {
       
            "success": true,
            "isRemoved": true
            
        
    };

        res.send(couponResponse);

    });


};