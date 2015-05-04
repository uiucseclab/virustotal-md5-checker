var mongoose = require('mongoose');

module.exports = {
    databaseName: '',
    databaseHost: process.argv[3] || process.env.NODE_DB || 'mongodb://localhost:27017/'
};

module.exports.url = module.exports.databaseHost + module.exports.databaseName;