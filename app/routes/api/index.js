var express = require('express');
var scanRouter = require('./scan');


module.exports = (function() {
    var apiRouter = express.Router();

    apiRouter.use('/scans', scanRouter);

    return apiRouter;
})();