var express = require('express');
var pages = require('./../controllers/pages');


module.exports = (function() {
    var pagesRouter = express.Router();
    
    return pagesRouter;
})();