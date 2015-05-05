var models = require('./../models');
var RequestItem = models.RequestItem;


exports.getRequestItems = function(callback) {
    RequestItem
        .find()
        .exec(function(err, requests) {
            callback(err, requests);
        });
};

exports.createRequestItem = function(data, callback) {
    var newRequestItem = new RequestItem({
        md5: data.md5,
        done: false
    });
    newRequestItem.save(function(err, request) {
        callback(err, request);
    });
};

exports.getRequestItem = function(id, callback) {
    RequestItem
        .findById(id)
        .exec(function(err, request) {
            callback(err, request);
        });
};

exports.updateRequestItem = function(id, data, callback) {
    RequestItem
        .findById(id)
        .update({
            md5: data.md5,
            done: data.done
        })
        .exec(function(err, request) {
            callback(err, request);
        });
};

exports.deleteRequestItem = function(id, callback) {
    RequestItem
        .findById(id)
        .remove()
        .exec(function(err, request) {
            callback(err, request);
        });
};