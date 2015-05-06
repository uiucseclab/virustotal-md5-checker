var models = require('./../models');
var Scan = models.Scan;


exports.getScans = function(callback) {
    Scan
        .find()
        .exec(function(err, scans) {
            callback(err, scans);
        });
};

exports.createScan = function(data, callback) {
    var newScan = new Scan({
        md5: data.md5,
        results: []
    });
    newScan.save(function(err, scan) {
        callback(err, scan);
    });
};

exports.getScan = function(id, callback) {
    Scan
        .findById(id)
        .exec(function(err, scan) {
            callback(err, scan);
        });
};

exports.updateScan = function(id, data, callback) {
    Scan
        .findById(id)
        .update({
            md5: data.md5,
            results: data.results
        })
        .exec(function(err, scan) {
            callback(err, scan);
        });
};

exports.deleteScan = function(id, callback) {
    Scan
        .findById(id)
        .remove()
        .exec(function(err, scan) {
            callback(err, scan);
        });
};