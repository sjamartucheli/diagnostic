'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var mongoose = require('mongoose'),
    filePluginLib = require('mongoose-file'),
    filePlugin = filePluginLib.filePlugin,
    make_upload_to_model = filePluginLib.make_upload_to_model,
    Schema = mongoose.Schema;

var uploads_base = path.join(__dirname, 'uploads');
var uploads = path.join(uploads_base, 'u');


/**
 * Article Schema
 */
var LogFileSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    machineid: {
        type: Number,
        default: 0
    }
});

LogFileSchema.plugin(filePlugin, {
    name: 'FileUpload',
    upload_to: make_upload_to_model(uploads, 'FileUploads'),
    relative_to: uploads_base
});

LogFileSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('LogFile', LogFileSchema);
