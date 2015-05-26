var express = require('express');
var app = express();

// All CSS, JS and images files
app.use(express.static(__dirname +'/public'));

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