var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var fs = require('fs');



// Include information from server-info.json
// This contains some secret strings usefull to the different serers
// for things like authentication...
var serverInfo = JSON.parse(fs.readFileSync(__dirname + '/../server-info.json', 'utf-8'));

mongoose.connect("mongodb://localhost/" + serverInfo.database);

var jwtAuth = require('./jwt-auth')(serverInfo.jwtSecret);

var app = express();

// Log all the action to the console and a file
var accessLogStream = fs.createWriteStream(__dirname + '/../log/access.log', {flags: 'a'});
app.use(morgan('dev', {stream:accessLogStream}));

// All CSS, JS and images files
app.use(express.static(__dirname +'/public'));

app.use(cookieParser());
app.use(bodyParser.json());

// If not ajax, redirect to index.html. Static resources still work.
app.use(function(req, res, next){
    if (!req.xhr){
        // This is not an ajax request... redirect to index.html
        res.redirect('/');
    }
    next();
});

// Authenticate the user.
app.use(jwtAuth.Authenticate);

// Load index.html which will start the Angular.js app
app.get('/', function (req, res) {
    res.sendfile(__dirname +'/public/index.html');
});

// TODO: API for login, register, highscore etc

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
