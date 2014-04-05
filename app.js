var dbstr = "mongodb://MongoLab-b:aFlSNajm_fMQrxnOFoN6J7ZT6seBKDbbQc9fo1nUOfk-@ds030817.mongolab.com:30817/MongoLab-b"

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var events = require('./routes/events');
var port     = process.env.PORT || 8080;
var http = require('http');
var path = require('path');
var appError = require('./appError');
var mongo = require('mongodb').MongoClient;

mongo.connect(dbstr, function(err, db){
	if(err){
		console.log("Could no connect");
		return;
	}
	console.log("success");
});

// MongoDB configs
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/converge');
var mongoose = require('mongoose');
var configDB = require('./config/database.js'); 

// Auth
var passport = require('passport');
var flash 	 = require('connect-flash');

var app = express();

mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser()); // read cookies (needed for auth)
app.use(express.bodyParser()); // get information from html forms

// Required for passport
app.use(express.session({ secret: 'foobarbazsomething' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(appError.notFound); // 404 handler
app.use(appError.handler);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Routing
// app.get('/', routes.index);
app.get('/api/events/:userid', events.list);
// app.get('/users', routes.users(db));
require('./routes/index.js')(app, passport); // load our routes and pass in our app and fully configured passport 


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
