
var express = require('express'), app = express.createServer();

app.configure(function() {
  app.use(express.logger());
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});


app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/id/:id', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.post('/site/deploy', function(req, res) {
  var payload = JSON.parse(req.body.payload);
  if (payload.ref === 'refs/heads/master' && payload.after.match(/[0-9a-z]{40}/i)) {
    process.send({ cmd: 'zion:fork', deploy: payload.after });
  }
  res.send(201);
});


app.listen(parseInt(process.env.PORT) || 3000);
