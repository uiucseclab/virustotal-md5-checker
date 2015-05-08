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

    // check if scans for the items already exists
    var md5s = [];
    for (var i = 0; i < items.length; i++)
        md5s.push(items[i].md5);
    Scan
        .find({ md5: { $in: md5s } })
        .exec(function(err, scans) {

            // get ids and md5s of existing scans
            var scanIds = [];
            var scanMd5s = [];
            for (var i = 0; i < scans.length; i++) {
                scanIds.push(scans[i]._id);
                scanMd5s.push(scans[i].md5);
            }

            // get items that have md5s not in array of existing scans
            var newItems = items.filter(function(item) { return scanMd5s.indexOf(item.md5) < 0; });
            console.log(newItems);

            // create new scan and requestitem objects and remove duplicates
            var temp = {};
            for (var i = 0; i < newItems.length; i++) {
                temp[newItems[i].md5] = 0;
            }
            var newScans = [];
            var newRequestItems = [];
            for (md5 in temp) {
                newScans.push({ md5: md5, results: [] });
                newRequestItems.push({ md5: md5 });
            }
            console.log(newScans);

            // create the new scans
            Scan.create(newScans, function(err) {
                if (err) {
                    callback(err, null);
                } else {

                    // get the ids and md5s of new scans
                    var scans = arguments;
                    var newScanIds = [];
                    var newScanMd5s = [];
                    for (var i = 1; i < scans.length; ++i) {
                        newScanIds.push(scans[i]._id);
                        newScanMd5s.push(scans[i].md5);
                    }
                    console.log(newScanIds);
                    console.log(newScanMd5s)

                    // create new requestitems for new md5s
                    RequestItem.create(newRequestItems, function(err, requestitems) {
                        if (err) {
                            callback(err, null);
                        } else {

                            // get the correct list of ids (may be mix of old and new scans)
                            var ids = [];
                            for (var i = 0; i < md5s.length; i++) {
                                var scanIndex = scanMd5s.indexOf(md5s[i]);
                                var newScanIndex = newScanMd5s.indexOf(md5s[i]);
                                ids.push(scanIndex > -1 ? scanIds[scanIndex] : newScanIds[newScanIndex]);
                            }
                            console.log(ids);

                            var newRequest = new Request({
                                items: ids
                            });
                            newRequest.save(function(err, request) {
                                var data = request;
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