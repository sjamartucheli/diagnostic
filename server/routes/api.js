'use strict';

var api = require('../controllers/api');

module.exports = function(app) {

    //app.get('/logfiles', logfiles.all);
    app.post('/api/upload', api.upload);
    //app.get('/logfiles/:logfileId', logfiles.show);
    //app.put('/logfiles/:logfileId', authorization.requiresLogin, hasAuthorization, logfiles.update);
    //app.del('/logfiles/:logfileId', logfiles.destroy);

    //app.param('logfileId', logfiles.logfile);

};