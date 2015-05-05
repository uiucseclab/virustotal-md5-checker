var express = require('express');
var scanRouter = require('./scan');
var requestRouter = require('./request');


module.exports = (function() {
    var apiRouter = express.Router();

    apiRouter.use('/scans', scanRouter);
    apiRouter.use('/requests', requestRouter);

    return apiRouter;
})();