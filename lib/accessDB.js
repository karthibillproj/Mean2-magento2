// Module dependencies
var util = require('util'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Category = require('../server/models/category.schema'),
    Product = require('../server/models/product.schema'),
    Customer = require('../server/models/customer.schema'),
    Cms = require('../server/models/cms.schema'),
    Cart = require('../server/models/cart.schema'),
    Quote = require('../server/models/quote.schema'),
    dbConfig = require('./configLoader').databaseConfig,
    menu = require('../server/models/menu.schema'),
    connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
    connection = null;

// connect to database
module.exports = {
    // initialize DB
    startup: function(callback) {
        if (!mongoose.connection.readyState) {
            mongoose.connect(connectionString);
            connection = mongoose.connection;
            mongoose.Promise = global.Promise;
            mongoose.connection.on('open', function() {
                console.log('We have connected to mongodb');
            });
        }
    },

    // disconnect from database
    close: function() {
        connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    },

    // insert Category
    insertCategory: function(req_body, callback) {
        // Inserting Category
        req_body[0]['filters'] = req_body[0].filterAttributes;
        var category = new Category({
            entityId: req_body[0].categoryId, name: req_body[0].name,
            isActive: req_body[0].isactive, image: req_body[0].image,
            include_in_menu: req_body[0].inmenu, description: req_body[0].description,
            displayMode: req_body[0].displayMode, identifier: req_body[0].identifier,
			filters: req_body[0].filterAttributes,
        });
        category.save(function(err) {
            if (err) {
                console.log('Error while saving Category: ' + err);
            } else {
                console.log('Category Saved Successfully !');
                // Inserting CMS block of Category
                if (req_body[0].identifier) {
                    Cms.find({'cmsid': req_body[0].identifier}, function(err, result) {
                        if (result.length == 0) {
                            var cms = new Cms({
                                cmsid: req_body[0].identifier,
                                content: req_body[0].content,
                                images: req_body[0].images
                            });
                            cms.save(function(err) {
                                if (err) {
                                    console.log("Error inserting cms while inserting category: " + err);
                                } else {
                                    callback(null, req_body);
                                }
                            });
                        }
                    });
                } else {
                    console.log("CMS Not available ! ");
                    callback(null, req_body);
                }
            }
        });
    },

    getCategory: function(id, callback) {
        Category.find({'entityId': id}, function(err, categoryDetails) {
            if (err) {
                console.log("Error in getCategory() " + err);
                callback(null, err);
            } else if (categoryDetails.length != 0) {
                Cms.find({'cmsid': categoryDetails[0].identifier}, function(err, result) {
                    if (err) {
                        console.log("Error getting cms: " + err);
                    } else {
                        if (result.length != 0) {
                            var response = {'displayMode':categoryDetails[0].displayMode, 'content': result[0].content};
                            callback(null, response);
                        } else {
                            var response = [categoryDetails[0].displayMode, categoryDetails[0].filters];
                            callback(null, categoryDetails);
                        }
                    }
                });
            } else {
                callback(null, categoryDetails);
                console.log('getCategory() executed Successfully.. But No data found');
            }
        });
    },

    // insert a  Customer
    insertCustomer: function(req_body, callback) {
        var customer = new Customer({
            id: req_body.id, firstname: req_body.firstname,
            lastname: req_body.lastname, email: req_body.email,
            customertoken: req_body.customertoken//,
           // quoteid:req_body.quoteid
        });
        customer.save(function(err) {
            if (err) {
                console.log('Error while saving customer: ' + err);
            }
        });
    },

    // get customer by token
    getCustomerByToken: function(customertoken, callback) {
        Customer.find({'customertoken': customertoken}, function(err, customer) {
            if (err) {
                console.log("Error Fething Customer: " + err);
            } else {
                callback(null, customer[0]);
            }
        });
    },

    // delete customer token
    deleteCustomerToken: function(customertoken, callback) {
        Customer.remove({'customertoken': customertoken}, function(err, customer) {callback(null);});
    },

    // insert a  Product
    insertProduct: function(product, callback) {
        Product.find({'sku': product.sku}, function(err, doc) {
            if (doc.length !=0) {
                Product.remove({'sku': product.sku}, function(err){
                    product.save(function(err) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        }
                        callback(null);
                    });
                });
            }
            product.save(function(err) {
                if (err) {
                    console.log(err);
                    callback(err);
                }
                callback(null);
            });
        });
    },
    getNavigationMenu: function(err, callback) {
        menu.find(function(err, menuData) {
            if (err) {
                console.log("Error fething Menu: " + err);
            } else {
                callback(null, menuData);
            }

        });
    },
    insertNavigationMenu: function(menuData, callback) {
        menuSchema = new menu();
        menuSchema.menu.push(menuData);
        menuSchema.save(function(err) {
            if (err) {
                console.log('Error while saving menuSchema: ' + err);
            } else {}
        });
        callback(null, menuSchema.menu[0]);
    },
    getProduct: function(sku, callback) {
        Product.find({'sku': sku}, function(err, product) {
            if (err) {
                console.log("Error fething product: " + err);
            } else {
                callback(null, product[0]);
            }
        });
    },
    getCategoryProducts: function(req, callback) {
        // get all the url parameters.
        var categories = req.query.category,
            priceMin = req.query.minprice,
            priceMax = req.query.maxprice,
            urlQueryParams = req.query;
        // query binding variebles.
        var orQueryChunk = { $or: []},
            andQueryChunk = { $and: [] },
            mainQueryChunk = { $and: [] };
        //First category query.
        andQueryChunk.$and.push({'categoryid' : { '$all' :  [req.params.id] }});
        //get all the URL filter parameter and bind in query.
        Object.keys(urlQueryParams).forEach(function(element, key, _array) {
            if (element != 'sort' && element!= "minprice" && element != "maxprice" && element != "page") {
                var filterValue = urlQueryParams[element].split(',');
                for(var m=0; m<filterValue.length; m++){
                    orQueryChunk.$or.push({ "filters.value" : { '$all' :  [filterValue[m]] }});
                }
            }
        });
        // subcategory query binding.
        //q.$or.push({'categoryid' : { '$all' :  [req.params.id] }});
        // if (categories) {
        // w.$and.push({'categoryid' : { '$all' :  [categories] }});
        // }
        // price filter query binding.
        if (priceMin && priceMax) {
            andQueryChunk.$and.push({ price: { $lt: priceMax, $gte: priceMin } });
        }
        // removing OR condition from query if empty.
        if (orQueryChunk.$or.length != 0) {
            mainQueryChunk.$and.push(orQueryChunk);
        }
        //binding all query chunks in main query.
        mainQueryChunk.$and.push(andQueryChunk);
        //applying query.
        Product.find(mainQueryChunk, function(err, products){
            if (err) {
                console.log("Error fething products: " + err);
                mongoose.connection.close();
            } else if(products) {
                var res = productResponseBuild(products);
                callback(null, res);
            }
        }).limit(100).sort(req.query.sort);
    },


    getCmsPage: function(id, callback) {
        Cms.find({'cmsid': id}, {}, function(err, result) {
            if (err) {
                console.log("Error getting cms: " + err);
            } else {
                if (result.length) {
                    callback(null, result[0]);
                } else {
                    callback(null, result);
                }
            }
        });
    },

    insertCmsPage: function(req_body, callback) {
        var cms = new Cms({
            cmsid: req_body[0].identifier, content: req_body[0].content,
            images: req_body[0].images
        });
        cms.save(function(err) {
            if (err) {
                console.log("Error inserting cms: " + err);
            } else {
                callback(null, cms);
            }
        });
    },

	// Get the list of Featured Products
	getFeaturedProducts: function(callback) {
        Product.find({"isfeatured": 1}, function(err, products) {
            if (err) {
                console.log("Error fething featured product: " + err);
            } else if(products) {
                var res = productResponseBuild(products);
                callback(null, res);
            }
        });
	},

    // insert   Cart
    insertCart: function(req_body, callback) {
        console.log('Inser Cart accessdb');
        var CustId = req_body.customer_id,
            sku = req_body.product_sku,
            proqty = req_body.product_qty,
            proPrice = req_body.product_price;

        Product.find({'sku': sku}, function(err, product) {
            //console.log(product);
            if (err) {
                console.log("Error fething product: " + err);
            } else {
                Cart.find({customer_id: CustId, product_sku: sku}, function(err, existingUserCart) {
                    if (existingUserCart.length == 0) {
                        var productOldQty = 0,
                            productUpdatedQty = 0,
                            subtotal = proPrice;
                    } else {
                        var productOldQty = existingUserCart[0].product_qty,
                        productUpdatedQty = ((productOldQty - 0) + (proqty - 0)),
                        subtotal = productUpdatedQty * proPrice;
                    }
                    if (err) {
                        console.log("Error Fething Quote : " + err);
                    } else if (existingUserCart.length != 0) {
                        //update
                        Cart.update(
                            {product_sku: sku},
                            {$set: {product_qty: productUpdatedQty,subtotal : subtotal}},
                            function(err, quote) {
                                if (err) {
                                    console.log("Error Fething Customer in Cart: " + err);
                                } else {
                                    console.log('customer Id Exist Cart Updated Successfully');
                                }
                            });
                    } else {
                        //save
                        var cart = new Cart({
                            customer_id: req_body.customer_id, product_id: req_body.product_id,
                            product_sku: req_body.product_sku, product_image: product[0].image,
                            product_name: product[0].name, product_price: req_body.product_price,
                            product_qty: req_body.product_qty, customer_firstname: req_body.firstname,
                            customer_lastname: req_body.lastname, customer_email: req_body.email,
                            subtotal : subtotal
                        });
                        cart.save(function(err) {
                            if (err) {
                                console.log('Error while saving cart: ' + err);
                            } else {
                                console.log('Cart Saved Successfully !');
                            }
                        });
                    }
                });
            }
        }); //product Find end
    },


    insertQuote: function(req_body, callback) {
        var customertoken = req_body.customer_id,
            sku = req_body.product_sku,
            itemsCountNew = req_body.product_qty,
            customerIdByToken = req_body.customer_id;

        Quote.findOne({customer_id: customerIdByToken}, function(err, existingUser) {
            if (err) {
                console.log("Error Fething Quote : " + err);
            } else if (existingUser == null) {
                // save
                Customer.find({'customertoken': customerIdByToken}, function(err, customer) {
                    if (err) {
                        console.log("Error Fething Customer in quote: " + err);
                    } else {
                        var quote = new Quote({
                            customer_id: req_body.customer_id, customer_firstname: req_body.firstname,
                            customer_lastname: req_body.lastname, customer_email: req_body.email,
                            items_count: req_body.product_qty
                        });
                        quote.save(function(err) {
                            if (err) {
                                console.log("Error inserting quote: " + err);
                            } else {
                                console.log('Quote Saved Successfully !');
                            }
                        });
                    }
                });
            } else {
                //update
                Quote.find({'customer_id': customerIdByToken}, function(err, quote) {
                    var customerId = quote[0].customer_id,
                    itemsCountOld = quote[0].items_count,
                    itemsCounts = ((itemsCountOld - 0) + (itemsCountNew - 0));
                    if (err) {
                        console.log("Error Fething Customer in quote: " + err);
                    } else if (customerId != 'undefined' || customerId != NUll) {
                        //update
                        Quote.update(
                        {customer_id: customerIdByToken},
                        {$set: {items_count: itemsCounts}},
                        function(err, quote) {
                            if (err) {
                                console.log("Error Fething Customer in quote: " + err);
                            } else {
                                console.log('customer Id Exist Quote Updated');
                            }
                        });
                    } else {
                        //save
                        Customer.find({'customertoken': customertoken}, function(err, customer) {
                            if (err) {
                                console.log("Error Fething Customer in quote: " + err);
                            } else {
                                var quote = new Quote({
                                    customer_id: customer[0].id,
                                    customer_firstname: customer[0].firstname,
                                    customer_lastname: customer[0].lastname,
                                    customer_email: customer[0].email,
                                    items_count: req_body.product_qty
                                });
                                quote.save(function(err) {
                                    if (err) {
                                        console.log("Error inserting quote: " + err);
                                    } else {
                                        console.log('Quote Saved Successfully !');
                                    }
                                });
                            }
                        });
                    }
                }); //quote Find Close
            }
        });

    }

};
productResponseBuild = function(products){
    var data = Array();
    // Looping to create responce data.
    for (var i = 0; i < products.length; i++) {
        // price divided into price, specialPrice, finalPrice.
        var isNew = "No", finalPrice = products[i].price;
        if (products[i].special_price) {
            finalPrice = products[i].special_price;
        }
        // isNew product set.
        for (var j = 0; j < products[i].filters.length; j++) {
            if (products[i].filters[j].code == 'new') {
                isNew = products[i].filters[j].value;
            }
        }
        // Creating an responce with collected data.
        data.push({
            name: products[i].name, sku: products[i].sku,
            image: products[i].image, url: products[i].urlkey,
            short_description: products[i].shortdescription,
            price: products[i].price, specialPrice: products[i].special_price,
            finalPrice: finalPrice, isNew: isNew,
            review: products[i].reviewscount
        });
    }
    return data;
}
