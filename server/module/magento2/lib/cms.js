var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.list = function () {
        return restClient.get('/categories');
    }

// Custom API

    module.getcmsDetails = function (id) {
        var endpointUrl = util.format('/cms/%s', id);
        return restClient.get(endpointUrl);
    }  

    return module;
}
