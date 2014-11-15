var express = require('express');
var path = require('path');
var mail = require('./routes/mail');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/mail', mail.main);

app.set('port', (process.env.PORT || 3000));

var port = app.get('port');
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)
});