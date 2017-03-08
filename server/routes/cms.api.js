var db = require('../../lib/accessDB')
var util = require('util');

exports.getcmspage = function (req, res) {
	var cmsid =  req.query.id;
    db.getCmsPage(cmsid, function (err, cmsDetails) {
        if (err) {
            console.log('Error while getting cmspage');
        } else if(cmsDetails.length != 0) {
            if(cmsid == 'home') {
                db.getFeaturedProducts(function(err, listOfProducts){
                    var contentResponse = {
										'cmsid' : cmsDetails.cmsid, 'content' : cmsDetails.content,
										'images' : cmsDetails.images, 'featured' : listOfProducts
									};
					res.send(contentResponse);
				});
			}else{
				res.send(cmsDetails);
			}
        } else {
            client.cms.getcmsDetails(cmsid)
                .then(function (response) {
                  if ( response.length  != 0 ) {
                        db.insertCmsPage(response, function (err, cmsAfterInsert) {
                            if (err) {
                                console.log('Error while inserting cmspage');
                            } else {
								if(cmsid == 'home'){
									db.getFeaturedProducts(function(err, listOfProducts){
										var contentResponse = {
											'cmsid' : cmsAfterInsert.cmsid,
											'content' : cmsAfterInsert.content,
											'images' : cmsAfterInsert.images,
											'featured' : listOfProducts
										};
									res.send(contentResponse);
								});
								}else{
									var contentResponse = {
											'cmsid' : cmsAfterInsert.cmsid,
											'content' : cmsAfterInsert.content,
											'images' : cmsAfterInsert.images
										};
									res.send(contentResponse);
								}
                            }
                        });
                  }
            });
		}
   });
};
