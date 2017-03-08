var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.list = function () {
        return restClient.get('/categories');
    }

// Custom API

    module.details = function (id) {
        var endpointUrl = util.format('/categories/%s', id);
        return restClient.get(endpointUrl);
    }

    module.getCategoryTree = function () {
       return restClient.get('/categorytree');
   }

    module.getCategoryWithChild = function (id) {
        var endpointUrl = util.format('/CategoryDetails/show/%s', id);
        return restClient.get(endpointUrl);
    }

    module.customerLogin = function (token) {
        return restClient.post('/integration/customer/token', token);
    }

    module.customerRegister = function (customerDetails) {
        return restClient.post('/customers', customerDetails);
    }

    module.customerMyaccount = function (customerToken) {
        console.log('Myaccount: ' + customerToken);
        var params = {'requestUrl' : '/customers/me', 'token': customerToken};
        return restClient.getWithToken(params);
    }
    
// Custom API
 
    module.create = function (categoryAttributes) {
        return restClient.post('/categories', categoryAttributes);
    }

    module.update = function (categoryId, categoryAttributes) {
        var endpointUrl = util.format('/categories/%d', categoryId);
        return restClient.put(endpointUrl, categoryAttributes);
    }

    module.delete = function (categoryId) {
        var endpointUrl = util.format('/categories/%d', categoryId);
        return restClient.delete(endpointUrl);
    }

    return module;
}
