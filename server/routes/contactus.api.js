var db = require('../../lib/accessDB')
var util = require('util');

exports.contactus = function (req, res) {
	
	var contactusdata =   	{                                
                                "name": req.body.name,
								"email":req.body.email,
								"telephone":req.body.telephone,
								"comment":req.body.comment
                            };
							
	client.contactus.contactus(contactusdata).then(function (response) {		
         if (response.length != 0) {           
                    res.send(response);
                }
            });
};