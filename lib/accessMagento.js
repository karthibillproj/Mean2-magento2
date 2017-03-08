var util = require('util');
var MagentoApiConfig = require('../lib/magentoRestApiClient.js');
var Magento2ClientObject = require('../server/module/magento2/index.js');

module.exports = {
    // initialize Magento
    startup: function(callback) {
        client = Magento2ClientObject.Magento2Client(MagentoApiConfig.options);
        client.Promise = global.Promise;
        console.log('We have connected to Magento 2');
    }
}