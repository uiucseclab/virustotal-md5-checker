var models = require('./../models');
var RequestItem = models.RequestItem;


exports.getRequestItems = function(callback) {
    RequestItem
        .find()
        .exec(function(err, requestitems) {
            callback(err, requestitems);
        });
};

exports.createRequestItem = function(data, callback) {
    // TODO: check if scan for data.md5 already exists
    var newRequestItem = new RequestItem({
        md5: data.md5
    });
    newRequestItem.save(function(err, requestitem) {
        callback(err, requestitem);
    });
};

exports.getRequestItem = function(id, callback) {
    RequestItem
        .findById(id)
        .exec(function(err, requestitem) {
            callback(err, requestitem);
        });
};

exports.updateRequestItem = function(id, data, callback) {
    RequestItem
        .findById(id)
        .update({
            md5: data.md5
        })
        .exec(function(err, requestitem) {
            callback(err, requestitem);
        });
};

exports.deleteRequestItem = function(id, callback) {
    RequestItem
        .findById(id)
        .remove()
        .exec(function(err, requestitem) {
            callback(err, requestitem);
        });
};