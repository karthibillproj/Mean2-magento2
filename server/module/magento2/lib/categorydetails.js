var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.list = function () {
        return restClient.get('/categories');
    }

// Custom API

	module.getCategorydetails = function (id) {
        var endpointUrl = util.format('/Category/%s', id);
        return restClient.get(endpointUrl);
    }

    return module;
}
