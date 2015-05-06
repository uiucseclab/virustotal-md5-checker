var express = require('express');
var scanApiController = require('./../../controllers/api').scanApiController;


module.exports = (function() {
    var scanRouter = express.Router();

    scanRouter.route('/')
        .get(scanApiController.getScans)
        .post(scanApiController.postScans)
        .options(scanApiController.optionsScans);

    scanRouter.route('/:scan_id')
        .get(scanApiController.getScan)
        .put(scanApiController.putScan)
        .delete(scanApiController.deleteScan);

    return scanRouter;
})();