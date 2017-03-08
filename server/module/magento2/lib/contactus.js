var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.list = function () {
        return restClient.get('/categories');
    }

// Custom API
   
	
	module.contactus = function (contactusdata) {
        return restClient.post('/contactus', contactusdata);
    }

    return module;
}
