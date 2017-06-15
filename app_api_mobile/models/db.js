var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/dss';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
	console.log('Moongoose connected to '+dbURI);
});
mongoose.connection.on('error', function(err) {
	console.log('Moongoose connection to '+dbURI+' failed error:'+err);
});
mongoose.connection.on('disconnected', function() {
	console.log('Moongoose disconnected ');
});

gracefulShutdown = function (msg,callback) {
	moongoose.connection.close(function() {
		console.log('Mongoose disconnected through '+msg);
		callback();
	});
};

// for nodemon restart
process.once('SIGUSR2', function() {
	gracefullShutdown('nodemon restart', function() {
		process.kill(process.pid,'SIGUSR2');
	});
});
// for app termination
process.on('SIGINT', function() {
	gracefullShutdown('app termination', function() {
		process.exit(0);
	});
});
// for heroku termionation
//process.once('SIGUSR2', function() {
//	gracefullShutdown('nodemon restart', function() {
//		process.kill(process.pid,'SIGUSR2');
//	});
//});

require('./mVolunteers');
require('./mEvents');