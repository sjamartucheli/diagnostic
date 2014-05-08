'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Machine Schema
 */
var MachineSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    machineid: {
        type: Number,
        unique: true,
        default: 0
    }
});

/**
 * Validations
 */
// MachineSchema.path('machineid').validate(function(machineid) {
//     return machineid === 0;
// }, 'Machineid cannot be zero');

/**
 * Statics
 */
MachineSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Machine', MachineSchema);
