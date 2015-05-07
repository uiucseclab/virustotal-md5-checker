var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RequestSchema = new Schema({
    items: {
        type: [String],
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

var RequestModel = mongoose.model('Request', RequestSchema, 'requests');

module.exports = RequestModel;