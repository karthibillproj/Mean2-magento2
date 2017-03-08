'use strict';
var util = require('util');

var RestClient = require('../../../server/module/magento2/lib/rest_client').RestClient;
var categories = require('../../../server/module/magento2/lib/categories');
var products = require('../../../server/module/magento2/lib/products');
var productMedia = require('../../../server/module/magento2/lib/product_media');
var cms = require('../../../server/module/magento2/lib/cms');
var categorydetails = require('../../../server/module/magento2/lib/categorydetails');
var contactus = require('../../../server/module/magento2/lib/contactus');
var cart = require('../../../server/module/magento2/lib/cart');

const MAGENTO_API_VERSION = 'V1';

module.exports.Magento2Client = function (options) {

    console.log('Server Module Magento2Client');

    var instance = {};

    options.version = MAGENTO_API_VERSION;


    var client = RestClient(options);

    instance.categories = categories(client);
    instance.products = products(client);
    instance.productMedia = productMedia(client);
	instance.cms = cms(client);
	instance.categorydetails = categorydetails(client);
    instance.contactus = contactus(client);
    instance.cart = cart(client);
    return instance;
}
