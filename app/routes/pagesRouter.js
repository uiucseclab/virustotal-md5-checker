var express = require('express');
var pages = require('./../controllers/pagesController');


module.exports = (function() {
    var pagesRouter = express.Router();
    
    return pagesRouter;
})();