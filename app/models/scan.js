var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ScanSchema = new Schema({
    md5: {
        type: String,
        required: true
    },
    positives: Number,
    total: Number,
    results: [{
        vendor: String,
        result: String
    }]
});

var ScanModel = mongoose.model('Scan', ScanSchema, 'scans');

module.exports = ScanModel;