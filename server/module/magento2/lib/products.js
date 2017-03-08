var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.list = function (searchCriteria) {
        var query = 'searchCriteria=' + searchCriteria;
        var endpointUrl = util.format('/products?%s', query);
        return restClient.get(endpointUrl);
    }

    // BOF PDP code
    module.productdetails = function (productSku) {
        var endpointUrl = util.format('/productdetails/%s', productSku);
        return restClient.get(endpointUrl);
    }

      // BOF PDP Review code
    module.productreview = function (reviewData) {
        return restClient.post('/submitreview', reviewData);
    }


    module.create = function (productAttributes) {
        return restClient.post('/products', productAttributes);
    }

    module.update = function (productSku, productAttributes) {
        var endpointUrl = util.format('/products/%s', productSku);
        return restClient.put(endpointUrl, productAttributes);
    }

    module.delete = function (productSku) {
        var endpointUrl = util.format('/products/%s', productSku);
        return restClient.delete(endpointUrl);
    }
    module.categoryProductApi = function (id) {
        var endpointUrl = util.format('/productcollection/%s', id);
        return restClient.get(endpointUrl);
    }

    return module;
}

