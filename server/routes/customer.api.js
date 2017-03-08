var db = require('../../lib/accessDB')
var util = require('util');

exports.login = function(req, res) {

    console.log('We are here : /routes/customer.api.js/login');
    console.log(req.body);
    // Magento API Token Based Authentication
    client.categories.customerLogin(req.body).then(function(response) {
        if (response.length != 0) {
            console.log('*** User Authentication');
            console.log("Token: " + response);
            res.json(response);
        }
    });

};

exports.myaccount = function(req, res) {

    console.log('We are here : /routes/customer.api.js/myaccount');

    var customertoken = req.get('customer_token');

    db.getCustomerByToken(customertoken, function(err, customer) {
        if (err) {
            console.log('*** customertfind err' + err);
        } else if (typeof customer !== 'undefined' && customer !== null) {
            console.log('*** customer find in mongodb');
            res.json(customer);
        } else {
            console.log('*** customer token not found in mongodb');

            client.categories.customerMyaccount(customertoken).then(function(response) {
                console.log('*** User Authentication');
                if (response.length != 0) {
                    console.log('*** Saving customer to MongoDB');
                    response.customertoken = customertoken;
                    //response.quoteid = 12;//need to change

                    db.insertCustomer(response, function(err) {
                        if (err) {
                            console.log('*** Err saving customer to MongoDB');
                        } else {
                            console.log('*** Saved customer to MongoDB');
                        }
                    });
                    res.json(response);
                }
            });
        }
    });
};

exports.logout = function(req, res) {

    console.log('We are here : /routes/customer.api.js/logout');

    var customertoken = req.get('customer_token');
    console.log(customertoken);

    console.log('*** Deleting customer from MongoDB');

    db.deleteCustomerToken(customertoken, function(err) {
        if (err) {
            console.log('*** Err deleting customer to MongoDB');
        } else {
            console.log('*** Delete customer to MongoDB');
            console.log('Logout successfuly');
            res.json(true);
        }
    });
};

exports.register = function(req, res) {

    console.log('We are here : /routes/customer.api.js/register');

    // Magento API Token Based Authentication
    var customerDetails = {
        "customer": {
            "email": req.body.email,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        },
        "password": req.body.passwords.password
    };

    var password = customerDetails.password;

    client.categories.customerRegister(customerDetails).then(function(response) {
        if (response.length != 0) {

            var username = response.email;

            credentials = {
                "username": username,
                "password": password
            };

            client.categories.customerLogin(credentials).then(function(token) {
                if (token.length != 0) {

                    var customertoken = token;
                    console.log('*** Saving customer to MongoDB');

                    response.customertoken = customertoken;

                    db.insertCustomer(response, function(err) {
                        if (err) {
                            console.log('*** Err saving customer to MongoDB');
                        } else {
                            console.log('*** Saved customer to MongoDB');
                        }
                    });
                    res.json(token);
                }
            });
        }
    });

}