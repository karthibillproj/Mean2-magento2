var util = require('util');

module.exports = function(restClient) {
    var module = {};

    // BOF Ankit for Cart
    module.magentoquote = function(cartId) {


        return restClient.post('/carts');

    }

    module.magentoquoteitem = function(cartItem, cartId) {

        return restClient.post('/carts/' + cartId + '/items', cartItem);

    }

    module.magentoquotecustomer = function(customerId) {


        return restClient.post('/customers/' + customerId + '/carts');

    }


    module.getCart = function(quoteId) {
        var endpointUrl = util.format('/carts/%s', quoteId);
        return restClient.get(endpointUrl);
    }
    // EOF Ankit for Cart


    module.billing = function(billingaddress, quoteId) {
        return restClient.post('/carts/' + quoteId + '/billing-address', billingaddress);
    }

    //get shipping methods
    module.getshippingmethods = function(shippingAddress, quoteId,billingdata) {
        return restClient.post('/carts/' + quoteId + '/estimate-shipping-methods',shippingAddress);

    }

    //get shipping information
    module.getshippingInformation = function(shippingInformation, quoteId) {
        return restClient.post('/carts/' + quoteId + '/shipping-information',shippingInformation);

    }
  //BOF Ankit Order place 
    module.orderPlaceMagento = function(cartPayment, quoteId) {
        var endpointUrl = util.format('/carts/' + quoteId + '/order/');
        return restClient.put(endpointUrl, cartPayment);
    }

    // BOF Get Quote data
    module.getquoteDataMagento = function(quoteId) {
        var endpointUrl = util.format('/carts/' + quoteId + '/items');
        return restClient.get(endpointUrl);
    }


    // BOF Get Quote Totals
    module.getquoteTotalsMagento = function(quoteId, arrayImage) {
        var endpointUrl = util.format('/carts/' + quoteId + '/totals');
        return restClient.get(endpointUrl);
    }

    //BOF Ankit Delete Cart Item
    module.deleteCartItemMagento = function(quoteId, itemId) {
        var endpointUrl = util.format('/carts/' + quoteId + '/items/' + itemId);
        return restClient.delete(endpointUrl);
    }

    //BOF Ankit Update cart
    module.updateCartItemMagento = function(cartItem) {
        var quoteId = cartItem.cartItem.quoteId;
        var itemId = cartItem.cartItem.itemId;
        var endpointUrl = util.format('/carts/' + quoteId + '/items/' + itemId);
        return restClient.put(endpointUrl, cartItem);
    }

    //BOF Ankit Coupon Code
    module.couponMagento = function(couponCode, quoteId) {
        var endpointUrl = util.format('/carts/' + quoteId + '/coupons/' + couponCode);
        return restClient.put(endpointUrl, couponCode);
    }
    ///V1/carts/{cartId}/coupons

    module.deleteCoupon = function(quoteId) {
        var endpointUrl = util.format('/carts/' + quoteId + '/coupons');
        return restClient.delete(endpointUrl);
    }

    return module;
}