'use strict';

var logfiles = require('../controllers/logfiles');

module.exports = function(app) {

    app.get('/logfiles', logfiles.all);
    app.post('/logfiles', logfiles.create);
    app.get('/logfiles/:logfileId', logfiles.show);
    // app.put('/logfiles/:logfileId', authorization.requiresLogin, hasAuthorization, logfiles.update);
    app.delete('/logfiles/:logfileId', logfiles.destroy);

    app.param('logfileId', logfiles.logfile);

};