'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Api = new Module('api');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Api.register(function(app, auth, database) {

  require('./server/config/config');

  //We enable routing. By default the Package Object is passed to the routes
  Api.routes(app, auth, database);

  return Api;
});
