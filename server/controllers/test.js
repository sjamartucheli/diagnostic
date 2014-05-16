'use strict';

var Busboy = require('busboy');
var path = require('path');
//var os = require('os');
var fs = require('fs');
// var Grid = require("gridfs-stream");
// var gfs = new Grid(db, mongo);

exports.test = function(req, res) {
    var busboy = new Busboy({ headers: req.headers });

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
       // Stream file here
        //var saveTo = fs.createWriteStream(path.join(os.tmpDir(), path.basename(filename)));
        var now = new Date();
        var saveTo2 = fs.createWriteStream(path.join('../upload/', path.basename(now.getTime().toString(36)) + '.txt'));
        file.pipe(saveTo2);
    });

    busboy.on('field', function(name, value){  
        // Recebemos um campo *O*
        console.log('Recebemos o campo %s com o valor %s', name, value);
    });

    busboy.on('finish', function() {
        res.send('success');
    });

    req.pipe(busboy);
};

// And then in the controller
// busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
//     var store = gfs.createWriteStream({filename: filename, content_type: mimetype});
//     file.pipe(store);
//     store.on("close", function(file) {
//        // Do something with file.fileId or even file.filename
//     });
// });