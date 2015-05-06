var express = require('express');
var scanApiRouter = require('./scanApiRouter');
var requestApiRouter = require('./requestApiRouter');
var requestitemApiRouter = require('./requestitemApiRouter');


module.exports = (function() {
    var apiRouter = express.Router();

    apiRouter.use('/scans', scanApiRouter);
    apiRouter.use('/requests', requestApiRouter);
    apiRouter.use('/requestitems', requestitemApiRouter);

    return apiRouter;
})();