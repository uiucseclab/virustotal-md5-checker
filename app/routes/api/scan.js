var express = require('express');
var scanApiController = require('./../controllers/api').scanApiController;


module.exports = (function() {
    var scanRouter = express.Router();

    scanRouter.route('/scans')
        .get(scanApiController.getScans)
        .post(scanApiController.postScans)
        .options(scanApiController.optionsScans);

    scanRouter.route('/scans/:scan_id')
        .get(scanApiController.getScan)
        .put(scanApiController.putScan)
        .delete(scanApiController.deleteScan);

    return scanRouter;
})();