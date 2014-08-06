'use strict';

var fs = require('fs');

// Create a folder to upload files if it does not exist
var uploadFolder = '../upload';
fs.exists(uploadFolder, function(exists) {
    if (!exists) {
        fs.mkdir(uploadFolder);
    }
});