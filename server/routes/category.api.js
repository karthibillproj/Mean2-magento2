var db = require('../../lib/accessDB')
var util = require('util');

exports.category = function (req, res) {
    var categoryId =  req.query.id;
   // Check if category already exist in MongoDB the return data from MongoDB itself
    db.getCategory(categoryId, function (err, categoryDetails) {

        if (err) {
            console.log(err);
        } else if(categoryDetails.length != 0){
            res.send(categoryDetails);
        } else {
            client.categories.getCategoryWithChild(categoryId)
                .then(function (response) {
                  if ( response.length  != 0 ) {
                        db.insertCategory(response, function (err, categoryAfterInsert) {
                            if (err) {
                                console.log(err);
                            } else {
                            res.send(JSON.stringify(Array(categoryAfterInsert)));
                            }
                        });
                  }
            });
       }
   });
};