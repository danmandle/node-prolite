var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
var port = process.env.PORT || 5000;

var fs = require('fs');
var _ = require('lodash');

app.configure(function() {
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public'))); // this seems necessary to serve files from the view directory...
	app.set('view engine', 'ejs');
	ejs.open = '{{';
	ejs.close = '}}';
});

// routes
var routes = require('./routes.js').routes(app);

// start the server
app.listen(port, function() {

	console.log('Starting server. Listening on port ' + port);
});
