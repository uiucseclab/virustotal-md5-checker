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
    console.log(items);
    RequestItem.create(items, function(err, requestitems) {
        if (err) {
            callback(err, null);
        } else {
            console.log(arguments);
            var ids = [];
            for (var i = 1; i < arguments.length; ++i) {
                ids.push(arguments[i]._id);
            }
            var newRequest = new Request({
                items: ids,
                isComplete: false
            });
            newRequest.save(function(err, request) {
                var data = request;
                data.requestitems = requestitems;
                callback(err, data);
            });
        }
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
            var items = request.items;
            RequestItem
                .find({ _id : { $in: items } })
                .remove()
                .exec(function(err, requestitems) {
                    var data = request;
                    data.removedItems = requestitems;
                    callback(err, data);
                });
        });
};