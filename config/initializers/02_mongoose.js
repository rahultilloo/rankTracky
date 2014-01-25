 var config = require('../config');
 var mongoose = require('mongoose');
 var mongooseTypes = require("mongoose-types");

 mongoose.connect(config.databaseUrl);
 mongooseTypes.loadTypes(mongoose);
 mongoose.connection.on('error', function(err) {
 	console.log('-------------------- MONGOOSE DB CONNECT ERROR: ' + err);
 });