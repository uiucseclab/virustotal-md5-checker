var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// load config files
var database = require('./app/config/database');
var settings = require('./app/config/settings');


// load all models
var models = require('./app/models');


var app = express();


// connect to the database
mongoose.connect(database.url, function(err) {
    if (err) console.log('Failed to connect to database: ' + database.databaseName);
    else console.log('Connected to database: ' + database.databaseName);
});


// allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
};
app.use(allowCrossDomain);


// use additional middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// use public folder (for static files)
app.use(express.static(__dirname + '/public'));


// load routes
require('./app/routes')(app);


// error handlers
if (settings.env === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        });
    });
} else {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json({
            message: err.message,
            error: {}
        });
    });
}


// start cron job
require('./app/cron');


// run the server
console.log("Express server running on " + settings.port);
app.listen(settings.port);

module.exports = app;