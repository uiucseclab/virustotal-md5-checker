var express = require('express');
var requestitemApiController = require('./../../controllers/api').requestitemApiController;


module.exports = (function() {
    var requestitemRouter = express.Router();

    requestitemRouter.route('/')
        .get(requestitemApiController.getRequestItems)
        .post(requestitemApiController.postRequestItems)
        .options(requestitemApiController.optionsRequestItems);

    requestitemRouter.route('/:requestitem_id')
        .get(requestitemApiController.getRequestItem)
        .put(requestitemApiController.putRequestItem)
        .delete(requestitemApiController.deleteRequestItem);

    return requestitemRouter;
})();