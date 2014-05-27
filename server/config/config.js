'use strict';

// Utilize Lo-Dash utility library
var _ = require('lodash'),
    fs = require('fs');

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = ~fs.readdirSync('./server/config/env').map(function(file) {
    return file.slice(0, -3);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

// Create a folder to upload files if it does not exist
var uploadFolder = '../upload';
fs.exists(uploadFolder, function(exists) {
    if (!exists) {
        fs.mkdir(uploadFolder);
    }
});

// Extend the base configuration in all.js with environment
// specific configuration
module.exports = _.extend(
    require('./env/all'),
    require('./env/' + process.env.NODE_ENV) || {}
);
