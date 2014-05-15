'use strict';

var test = require('../controllers/test');

module.exports = function(app) {

    //app.get('/logfiles', logfiles.all);
    app.post('/api/upload', test.test);
    //app.get('/logfiles/:logfileId', logfiles.show);
    //app.put('/logfiles/:logfileId', authorization.requiresLogin, hasAuthorization, logfiles.update);
    //app.del('/logfiles/:logfileId', logfiles.destroy);

    //app.param('logfileId', logfiles.logfile);

};