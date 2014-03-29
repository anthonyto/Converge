
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var events = require('./routes/events');
var http = require('http');
var path = require('path');
var appError = require('./appError');

// MongoDB configs
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/converge');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
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
app.get('/', routes.index);
app.get('/api/events/:userid', events.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
