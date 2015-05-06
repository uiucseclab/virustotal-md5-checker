var express = require('express');
var scanApiRouter = require('./scanApiRouter');
var requestApiRouter = require('./requestApiRouter');


module.exports = (function() {
    var apiRouter = express.Router();

    apiRouter.use('/scans', scanApiRouter);
    apiRouter.use('/requests', requestApiRouter);

    return apiRouter;
})();