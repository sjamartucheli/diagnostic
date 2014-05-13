'use strict';

var mongoose = require('mongoose'),
    LogFile = mongoose.model('LogFile');
    // _ = require('lodash');


exports.logfile = function(req, res, next, id) {
    LogFile.load(id, function(err, logfile) {
        if (err) return next(err);
        if (!logfile) return next(new Error('Failed to load log ' + id));
        req.logfile = logfile;
        next();
    });
};

exports.create = function(req, res) {
    var logfile = new LogFile(req.body);
    

    logfile.save(function(err) {
        if (err) {
            return res.send({
                errors: err.errors,
                logfile: logfile
            });
        } else {
            res.jsonp(logfile);
        }
    });
};

exports.destroy = function(req, res) {
    var logfile = req.logfile;

    logfile.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                logfile: logfile
            });
        } else {
            res.jsonp(logfile);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.logfile);
};

exports.all = function(req, res) {
    LogFile.find().sort('-created').populate('user', 'name username').exec(function(err, logfiles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(logfiles);
        }
    });
};