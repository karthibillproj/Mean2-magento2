var db = require('../../lib/accessDB');
var util = require('util');

exports.navigationmenu = function (req, res) {
    /** GetMenu from db if data exist.
    * getMenu from Magento if data not exist.
    * Save data to local db.
    */
    db.getNavigationMenu(null, function (err, menu) {
        if (err) {
            console.log(err);
        } else if(menu.length != 0) {
            var data = Array(menu);
            res.json(data[0][0]['menu'][0]);
        } else {
            client.categories.getCategoryTree()
            .then(function (response) {
                db.insertNavigationMenu(response, function (err, menuAfterInsert) {
                    res.json(menuAfterInsert);
                });
            }).catch(function(err) {
                res.json(404);
            });
        }
    });
};
