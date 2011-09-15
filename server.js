
var express = require('express');
var app = express.createServer();

app.configure(function() {
  app.use(express.logger());
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/id/:id',  function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.listen(3000);

