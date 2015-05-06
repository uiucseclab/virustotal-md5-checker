var express = require('express');
var apiRouter = require('./api');
var pagesRouter = require('./pagesRouter');


module.exports = function(app) {
    var router = express.Router();
    router.use(function(req, res, next) {
        // print all requests
        console.log('%s %s %s', req.method, req.url, req.path);
        next();
    });
    app.use(router);

    app.use('/api', apiRouter);
    app.use('/', pagesRouter);


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};