var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RequestItemSchema = new Schema({
    md5: {
        type: String,
        required: true
    },
    // done: {
    //     type: Boolean,
    //     default: false
    // },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

var RequestItemModel = mongoose.model('RequestItem', RequestItemSchema, 'requestitems');

module.exports = RequestItemModel;