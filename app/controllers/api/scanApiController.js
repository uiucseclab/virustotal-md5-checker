var scanController = require('./../scanController');


exports.getScans = function(req, res, next) {
    var where  = req.query.where  ? JSON.parse(req.query.where)  : {};
    var sort   = req.query.sort   ? JSON.parse(req.query.sort)   : {};
    var select = req.query.select ? JSON.parse(req.query.select) : {};
    var skip   = req.query.skip   ? parseInt(req.query.skip)     : 0;
    var limit  = req.query.limit  ? parseInt(req.query.limit)    : 0;
    var count  = req.query.count  ? req.query.count === 'true'   : false;
    var params = {
        where: where,
        sort: sort,
        select: select,
        skip: skip,
        limit: limit,
        count: count
    };
    scanController.getScans(params, function(err, scans) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while retrieving scans',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully retrieved scans',
                data: scans
            });
        }
    })
};

exports.postScans = function(req, res, next) {
    scanController.createScan(req.body, function(err, scan) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while creating scan',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully created scan',
                data: scan
            });
        }
    });
};

exports.optionsScans = function(req, res, next) {
    res.sendStatus(200);
};

exports.getScan = function(req, res, next) {
    scanController.getScan(req.params.scan_id, function(err, scan) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while retrieving scan',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully retrieved scan',
                data: scan
            });
        }
    });
};

exports.putScan = function(req, res, next) {
    scanController.updateScan(req.params.scan_id, req.body, function(err, scan) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while updating scan',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully updated scan',
                data: scan
            });
        }
    });
};

exports.deleteScan = function(req, res, next) {
    scanController.deleteScan(req.params.scan_id, function(err, scan) {
        if (err) {
            res.status(500).json({
                message: 'Error',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully deleted scan',
                data: scan
            });
        }
    });
};