var models = require('./../models');
var Request = models.Request;
var RequestItem = models.RequestItem;


exports.getRequests = function(callback) {
    Request
        .find()
        .exec(function(err, requests) {
            callback(err, requests);
        });
};

exports.createRequest = function(data, callback) {
    var items = data.items;
    RequestItem.create(items, function(err, requestitems) {
        if (err) callback(err, null);
        var ids = requestitems.map(function(requestitem) { return requestitem._id; });
        var newRequest = new Request({
            items: ids,
            isComplete: false
        });
        newRequest.save(function(err, request) {
            callback(err, request);
        });
    });
};

exports.getRequest = function(id, callback) {
    Request
        .findById(id)
        .exec(function(err, request) {
            callback(err, request);
        });
};

exports.updateRequest = function(id, data, callback) {
    Request
        .findById(id)
        .update({
            items: data.items,
            isComplete: data.isComplete
        })
        .exec(function(err, request) {
            callback(err, request);
        });
};

exports.deleteRequest = function(id, callback) {
    Request
        .findById(id)
        .remove()
        .exec(function(err, request) {
            callback(err, request);
        });
};