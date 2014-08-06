'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogFileSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    machineid: {
        type: String
    },
    path: {
        type: String
    }
});

LogFileSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('LogFile', LogFileSchema);
