var express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),

    routes = require('./server/routes'),

    api = require('./server/routes/api'),
    categoryApi = require('./server/routes/category.api'),
    customerApi = require('./server/routes/customer.api'),
    productApi = require('./server/routes/product.api'),
    menuApi = require('./server/routes/navmenu.api'),
    cmsApi = require('./server/routes/cms.api'),

    cartApi = require('./server/routes/cart.api'),

    contactApi = require('./server/routes/contactus.api'),
    DB = require('./lib/accessDB'),
    Magento = require('./lib/accessMagento'),
    app = express();


var port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(__dirname + '/'));
app.use(errorhandler());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Routes
app.get('/', routes.index);

// JSON API
var baseUrl = '/api/dataservice/';

app.get(baseUrl + 'category', categoryApi.category);
app.post(baseUrl + 'register', customerApi.register);
app.post(baseUrl + 'login', customerApi.login);
app.get(baseUrl + 'account', customerApi.myaccount);
app.get(baseUrl + 'logout', customerApi.logout);
app.get(baseUrl + 'products/:sku', productApi.productdetail);
app.get(baseUrl + 'menu', menuApi.navigationmenu);
app.get(baseUrl + 'cms', cmsApi.getcmspage);
app.post(baseUrl + 'review', productApi.productreview);
app.get(baseUrl + 'category/:id', productApi.categoryProductList);
app.post(baseUrl + 'contactus', contactApi.contactus);
app.post(baseUrl + 'productimport', api.productimport);
/*app.get(baseUrl + 'price/:sku', productApi.productprice);
*/

app.get(baseUrl + 'magentocart', cartApi.quotemagento);//first Time create Crat & Quote for Guest //post
app.get(baseUrl + 'magentocartitem', cartApi.quoteitemmagento);  //second  Time add Item for Quote for Guest //post
app.post(baseUrl + 'magentocartcustomer', cartApi.customerquotemagento);//post add to cart
app.post(baseUrl + 'magentocartbilling', cartApi.billingmagento);//post
//app.get(baseUrl + 'magentoshippingmethods', cartApi.shippingmethods);//post commented due to shipping move to billing
app.post(baseUrl + 'magentoshippinginformation', cartApi.shippinginformation);//post
app.get(baseUrl + 'cartmagento', cartApi.quotedetailsmagento);//post
app.get(baseUrl + 'cartmagentodelete', cartApi.cartdeletemagento);//post
app.post(baseUrl + 'cartmagentoupdate', cartApi.cartupdatemagento);//post
app.post(baseUrl + 'couponmagento', cartApi.cartcouponmagento);//post
app.post(baseUrl + 'deletecouponmagento', cartApi.deletecouponmagento);//post 
app.post(baseUrl + 'magentoorderplace', cartApi.orderinformation);//post
  



// Creating a connection to MongoDB
DB.startup();

// Creating a connection to Magento 2
Magento.startup();

// Close MongoDB Connection
process.on('SIGINT', function() {
    console.log('SIGINT: Closing MongoDB connection');
    DB.close();
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(port, function () {
    console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});

exports = module.exports = app;
