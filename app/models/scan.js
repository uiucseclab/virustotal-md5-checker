var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ScanSchema = new Schema({
    md5: {
        type: String,
        required: true
    },
    results: [{
        vendor: String,
        result: {
            detected: Boolean,
            name: String,
            version: String,
            update: String
        }
    }]
});

var ScanModel = mongoose.model('Scan', ScanSchema, 'scans');

module.exports = ScanModel;