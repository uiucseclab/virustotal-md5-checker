var express = require('express');
var requestApiController = require('./../../controllers/api').requestApiController;


module.exports = (function() {
    var requestRouter = express.Router();

    requestRouter.route('/')
        .get(requestApiController.getRequests)
        .post(requestApiController.postRequests)
        .options(requestApiController.optionsRequests);

    requestRouter.route('/:request_id')
        .get(requestApiController.getRequest)
        // .put(requestApiController.putRequest)
        .delete(requestApiController.deleteRequest);

    return requestRouter;
})();