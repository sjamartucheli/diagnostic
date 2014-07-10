'use strict';

var Busboy = require('busboy'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    LogFile = mongoose.model('LogFile'),
    Machine = mongoose.model('Machine');
    // Grid = require("gridfs-stream"),
    // gfs = new Grid(db, mongo);

exports.test = function(req, res) {
    var busboy = new Busboy({ headers: req.headers });
    var logfile = new LogFile();

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var now = new Date(),
            fullpath = path.join('../upload/', path.basename(now.getTime().toString(36))),
            saveTo = fs.createWriteStream(fullpath);
        logfile.path = fullpath;
        file.pipe(saveTo);
    });

    busboy.on('field', function(name, value){  
        logfile[name] = value;
    });

    busboy.on('finish', function() {
        // Store on database
        logfile.save(function(err) {
            if (err) {
                return res.send('users/signup', {
                    errors: err.errors,
                    logfile: logfile
                });
            } else {
                res.jsonp(logfile);
            }
        });
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