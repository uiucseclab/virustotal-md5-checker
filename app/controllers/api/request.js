var requestController = require('./../request');


exports.getRequests = function(req, res, next) {
    requestController.getRequests(function(err, requests) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while retrieving requests',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully retrieved requests',
                data: requests
            });
        }
    })
};

exports.postRequests = function(req, res, next) {
    requestController.createRequest(req.body, function(err, request) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while creating request',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully created request',
                data: request
            });
        }
    });
};

exports.optionsRequests = function(req, res, next) {
    res.status(200).send();
};

exports.getRequest = function(req, res, next) {
    requestController.getRequest(req.params.request_id, function(err, request) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while retrieving request',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully retrieved request',
                data: request
            });
        }
    });
};

exports.putRequest = function(req, res, next) {
    requestController.updateRequest(req.params.request_id, req.body, function(err, request) {
        if (err) {
            res.status(500).json({
                message: 'Error encountered while updating request',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully updated request',
                data: request
            });
        }
    });
};

exports.deleteRequest = function(req, res, next) {
    requestController.deleteRequest(req.params.request_id, function(err, request) {
        if (err) {
            res.status(500).json({
                message: 'Error',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Successfully deleted request',
                data: request
            });
        }
    });
};