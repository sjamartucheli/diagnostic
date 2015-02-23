'use strict';

var Busboy = require('busboy'),
    path = require('path'),
    fs = require('fs'),
    Lazy = require('lazy'),
    mongoose = require('mongoose'),
    LogFile = mongoose.model('LogFile'),
    HashFile = mongoose.model('HashFile'),
    Machine = mongoose.model('Machine');
    // Grid = require("gridfs-stream"),
    // gfs = new Grid(db, mongo);

    /**************************************************
     *                                                *
     *                 REMOVER PRINTS                 *
     *                                                *
     **************************************************/

var processFile = function(filename, machineid) {
    new Lazy(fs.createReadStream(filename)).lines.forEach(
        function(line) {
            line = line.toString();
            if (line.match(/^\d+.*/)) {
                // Faz parse da linha e salva no bd
                var re = /[\d+]:\*(.+) - <(.+)> \[(.+)\]\[(\w+)\]/;
                var fields = line.split(re);

                /* [0]-> line number
                   [1]-> timestamp
                   [2]-> New Hash
                   [3]-> Path
                   [4]-> Hash
                */

                // New Hash??
                if (fields[2].localeCompare('NEW HASH') === 0) {

                    var hashfile = new HashFile();
                    hashfile.path = fields[3];
                    hashfile.hash = fields[4];
                    hashfile.machineid = machineid;

                    // Salva no bd
                    hashfile.save(function(err) {
                        if (err) {
                            console.log('Error: ' + err.errors);
                        }
                        //  else {
                        //     console.log(hashfile);
                        // }
                    });

                } else {
                    
                    HashFile.findOne({ path: fields[3], machineid: machineid }, function (err, hash) {
                        if (hash) {
                            hash.hash = fields[4];
                            hash.save(function (err) {
                                if (err) {
                                    return console.log('Error: ' + err.errors);
                                }
                                //  else {
                                //     console.log(hash);
                                // }
                            });
                        } else {
                            console.log('ERROR: %s does not exist.\nMachine_id: %s\n', fields[3], fields[4]);
                        }
                    });
                }
                
            }
        });
};

exports.upload = function(req, res) {
    var busboy = new Busboy({ headers: req.headers });
    var logfile = new LogFile();
    var machine = new Machine();

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var now = new Date(),
            fullpath = path.join('../upload/', path.basename(now.getTime().toString(36))),
            saveTo = fs.createWriteStream(fullpath);
        logfile.path = fullpath;
        file.pipe(saveTo);
    });

    busboy.on('field', function(name, value){  
        logfile[name] = value;
        machine[name] = value;
    });

    busboy.on('finish', function() {
        // Store on database
        logfile.save(function(err) {
            if (err) {
                return res.send('users/signup', {
                    errors: err.errors,
                    logfile: logfile
                });
            }
            // else {
            //     res.jsonp(logfile);
            // }
        });
        machine.save(function(err) {
            if (err) {
                return console.log('Error: ' + err.errors);
            } else {
                console.log(machine);
            }
        });
        processFile(logfile.path, logfile.machineid); // Verificar se consome muito tempo
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