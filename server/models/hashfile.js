'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HashFileSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    machineid: {
        type: String
    },
    path: {
        type: String
    },
    hash: {
        type: String
    },
    seen: {
        type: Boolean,
        default: true
    }
});

HashFileSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('HashFile', HashFileSchema);
