var models = require('./../models');
var Request = models.Request;
var RequestItem = models.RequestItem;
var Scan = models.Scan;


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

    // check if scans for the items already exists
    var md5s = items.filter(function(item) { return item.md5; });
    Scan
        .find({ md5: { $in: md5s } })
        .exec(function(err, scans) {
            var scanMd5s = scans.filter(function(scan) { return scan.md5; });
            var newItems = items.filter(function(item) { if (scanMd5s.indexOf(item.md5) < 0) return item; });
            var newScans = newItems.filter(function(item) { return { md5: item.md5, results: [] }; });
            Scan.create(newScans, function(err, savedScans) {
                if (err) {
                    callback(err, null);
                } else {
                    RequestItem.create(newItems, function(err, requestitems) {
                        if (err) {
                            callback(err, null);
                        } else {
                            console.log(arguments);
                            var ids = [];
                            for (var i = 1; i < arguments.length; ++i) {
                                ids.push(arguments[i]._id);
                            }
                            var newRequest = new Request({
                                items: ids
                            });
                            newRequest.save(function(err, request) {
                                var data = request;
                                data.requestitems = requestitems;
                                callback(err, data);
                            });
                        }
                    });
                }
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
            items: data.items
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
                .find({ _id: { $in: items } })
                .remove()
                .exec(function(err, requestitems) {
                    var data = request;
                    data.removedItems = requestitems;
                    callback(err, data);
                });
        });
};