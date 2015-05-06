var requestitemController = require('./../requestitemController');


exports.getRequestItems = function(req, res, next) {
    requestitemController.getRequestItems(function(err, requestitems) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while retrieving requestitems',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully retrieved requestitems',
                data: requestitems
            });
        }
    })
};

exports.postRequestItems = function(req, res, next) {
    requestitemController.createRequestItem(req.body, function(err, requestitem) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while creating requestitem',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully created requestitem',
                data: requestitem
            });
        }
    });
};

exports.optionsRequestItems = function(req, res, next) {
    res.status(200).send();
};

exports.getRequestItem = function(req, res, next) {
    requestitemController.getRequestItem(req.params.requestitem_id, function(err, requestitem) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while retrieving requestitem',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully retrieved requestitem',
                data: requestitem
            });
        }
    });
};

exports.putRequestItem = function(req, res, next) {
    requestitemController.updateRequestItem(req.params.requestitem_id, req.body, function(err, requestitem) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while updating requestitem',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully updated requestitem',
                data: requestitem
            });
        }
    });
};

exports.deleteRequestItem = function(req, res, next) {
    requestitemController.deleteRequestItem(req.params.requestitem_id, function(err, requestitem) {
        if (err) {
            res.status(500).json({
                message: 'Error',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully deleted requestitem',
                data: requestitem
            });
        }
    });
};