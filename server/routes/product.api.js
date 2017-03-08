var db = require('../../lib/accessDB');
var util = require('util');
var MagentoBaseUrl = require('../../config/magentobaseurl.js');
var Product = require('../../server/models/product.schema');

exports.productdetail = function(req, res) {
    //get SKU from url params
    var prodsku = req.params.sku.trim();
    //Check Mongo DB for product.
    db.getProduct(prodsku, function(err, product) {
        if (err) {
            console.log('*** productfind err' + err);
        } else if (product) {
            res.send(product);
        } else {
            //get product from Magento using API.
            client.products.productdetails(prodsku)
                .then(function(req_body) {
                    var product = new Product({
                        productid: req_body[0].productid, name: req_body[0].name,
                        sku: req_body[0].sku, price: req_body[0].price,
                        image: req_body[0].image, special_price: req_body[0].specialprice,
                        description: req_body[0].description, stockstatus: req_body[0].stockstatus,
                        reviewscount: req_body[0].reviewscount, overallrating: req_body[0].overallrating,
                        galleryimage: req_body[0].galleryimage, reviews: req_body[0].reviews,
                        upsell: req_body[0].upsell, moreinformation: req_body[0].moreinformation,
                        categoryid : req_body[0].categoryIds
                    });
                    //insert product data to Mongo DB.
                    db.insertProduct(product, function(err) {
                        if (err) {
                            console.log('*** addProduct err');
                        }
                    });
                    res.json(product);
                }).catch(function(err) {
                res.json(err);
            });
        }
    });
};
//product review function.
exports.productreview = function(req, res) {
    //var customertoken = 'v2eeejdn9krmrvrt78ikpci1xwg9h2pb';//req.get('customer_token');
    var customertoken = req.customerId;
    if(customertoken){
        //customer token is Null or undefined
        var reviewData = {
            "productId": req.body.productId,
            "customerId": "",
            "title": req.body.title,
            "detail": req.body.detail,
            "nickName": req.body.nickName
        };
        // Magento API Token Based Authentication
        client.products.productreview(reviewData).then(function(response) {
            if (response.length != 0) {
                res.json(reviewData);
            }
        }).catch(function(err) {
            res.json(err);
        });
    } else {
        //customer token Found
        db.getCustomerByToken(customertoken, function (err, customer) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                //customer find in mongodb with customer id
                var reviewData = {
                    "productId": req.body.productId,
                    "customerId": customer.id,
                    "title": req.body.title,
                    "detail": req.body.detail,
                    "nickName": req.body.nickName
                };
                client.products.productreview(reviewData).then(function(response) {
                    if (response.length != 0) {
                        res.json(reviewData);
                    }
                }).catch(function(err) {
                    res.json(err);
                });
            }
        });
    }
}

//return sorting types to getProductData.
getSortTypes = function () {
    return [{ "title": "Price: High to Low", "value": "pricedesc" },
                    { "title": "Price: low to High", "value": "priceasc" },
                    { "title": "Name: A-Z", "value": "nameasc" },
                    { "title": "Name: Z-A", "value": "namedesc" } ];
}

//return sortingQuery types to getProductData.
getSortingQuery = function(type) {
    var sortingQuery, currentSorting;
    if (type == "pricedesc") {
        sortingQuery = {'price': -1};
        currentSorting = "pricedesc";
    }else if(type == "priceasc"){
        sortingQuery = {'price': 1};
        currentSorting = "priceasc";
    }else if(type == "namedesc"){
        sortingQuery = {'name': -1};
        currentSorting = "namedesc";
    } else {
        sortingQuery = {'name': 1};
        currentSorting = "nameasc";
    }
    return {'sortingQuery': sortingQuery,
    'currentSorting': currentSorting };
}
//getProductData = function(req, res, displayMode, filters){
getProductData = function(req, res, categoryDetail){
    var priceFilter, filters;
    var displayMode = categoryDetail[0].displayMode;
    if (categoryDetail[0].filters) {
        filters = categoryDetail[0].filters;
        for (var i=0; i < filters.length; i++)
        if (filters[i]['filterId'] == 'price'){
            priceFilter = filters[i];
            filters.splice(i, 1);
        }
    }

    var sortType =  getSortTypes();
    var data = getSortingQuery(req.query.sort);
    var productData;
    //asign query string to request and pass to db query function
    req.query.sort = data.sortingQuery;
    db.getCategoryProducts(req, function (err, products) {
        if(err){
            console.log(err);
            res.json(err);
        } else if(products.length==0){
            productData =  {
                'categoryName': categoryDetail[0].name, 'categoryDescription': categoryDetail[0].description,
                'products': [], 'pageSize': 0, 'totalproducts': 0, 'pageCount': 0,
                'currentPage': 0, 'currentSorting': data.currentSorting, 'sortType': sortType,
                'displayMode': displayMode, 'filters' : filters, 'price' : priceFilter,
                'title':"Alert", 'message':"There are no products attached to this category"
            };
            res.json(productData);
        }else{
            //set default variables
            var totalproducts = products.length,
                pageSize = 12,
                pageCount = products.length/12,
                currentPage = 1,
                productsArrays = [],
                productsList = [];
            //split list into groups
            while (products.length > 0) {
                productsArrays.push(products.splice(0, pageSize));
            }
            //set current page if specifed as get variable (eg: /?page=2)
            if (typeof req.query.page !== 'undefined') {
                currentPage = +req.query.page;
            }
            //show list of students from group
            productsList = productsArrays[+currentPage - 1];
            productData =  {
                'categoryName' : categoryDetail[0].name,
                'categoryDescription' : categoryDetail[0].description,
                'products' : productsList,
                'pageSize' : pageSize,
                'totalproducts' : totalproducts,
                'pageCount' : pageCount,
                'currentPage' : currentPage,
                'currentSorting' : data.currentSorting,
                'sortType' : sortType,
                'displayMode' : displayMode,
				'filters' : filters,
				'price' : priceFilter
            };
            res.json(productData);
        }
    });
}

exports.categoryProductList = function (req, res) {
    db.getCategory(req.params.id, function (err, categoryDetail) {
        if (err) {
            console.log(err);
            res.json(err);
        } else if(categoryDetail.length != 0){
            if(categoryDetail.displayMode == 'PAGE'){
                console.log(categoryDetail);
                res.json({
                    'displayMode' : categoryDetail.displayMode,
                    'categoryContent' : categoryDetail.content});
            }else{
                //getProductData(req, res, categoryDetail[0], categoryDetail[1]);
                getProductData(req, res, categoryDetail);
            }
        } else {
            client.categorydetails.getCategorydetails(req.params.id)
                .then(function (response) {
                    if (response.length) {
                        db.insertCategory(response, function (err, categoryAfterInsert) {
                            if (err) {
                                console.log(err);
                                res.json(err);
                            } else if(categoryAfterInsert.length != 0) {
                                if(categoryAfterInsert[0].displayMode == 'PAGE') {
                                        res.json({'displayMode' : categoryAfterInsert[0].displayMode,
                                        'categoryContent' : categoryAfterInsert[0].content});
                                } else {
                                    getProductData(req, res, categoryAfterInsert );
                                }
                            } else {
                                console.log("Mongo DB: No Product Found");
                                res.json("Mongo DB: No Product Found");
                            }
                    });
                } else {
                    res.json(response);
                }
            }).catch(function(err){
                console.log(err);
                res.json(err);
            });
        }
    });
    // client.products.categoryProductApi(req.params.id, function(response){
    //     for(var i = 0; i < response.length; i++){
    //         console.log(response[i][0].id);
    //         var product = new Product({
    //                     productid: response[i][0].id,
    //                     name: response[i][0].name,
    //                     sku: response[i][0].sku,
    //                     price: response[i][0].price,
    //                     image: response[i][0].image,
    //                     special_price: response[i][0].specialprice,
    //                     description: response[i][0].description,
    //                     stockstatus: response[i][0].stockstatus,
    //                     reviewscount: response[i][0].reviewscount,
    //                     overallrating: response[i][0].overallrating,
    //                     galleryimage: response[i][0].galleryimage,
    //                     reviews: response[i][0].reviews,
    //                     upsell: response[i][0].upsell,
    //                     moreinformation: response[i][0].moreinformation,
    //                     categoryid : response[i][0].categoryIds
    //                 });
    //         db.insertProduct(product, function(err) {
    //             if (err) {
    //                 console.log('*** addProduct err');
    //             } else {
    //                 console.log('*** addProduct ok');
    //             }
    //         });
    //     }
    // }).then(function() {
        // set default values for sort

//    });

}
/*exports.productprice = function(req, res) {
    console.log("*** you are in product Price  ****");
    var prodsku = req.params.sku;
    console.log(prodsku);


    client.products.productprice(prodsku)
        .then(function(req_body) {

            var a = req_body.tierPrices;

            a.forEach(function(tierprice) {
                console.log(tierprice);
            });



            res.send(req_body);
        });


}*/
