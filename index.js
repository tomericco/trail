var express = require('express');
var path = require('path');
var mail = require('./routes/mail');
var bodyParser = require('body-parser');

var app = express();
var os = os;
var isProduction = os && os.environ && os.environ.TRAIL_ENV === 'production';
var clientDir = isProduction ? 'public/dist' : 'public';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, clientDir)));

app.set('port', process.env.PORT || 3000);
app.set('FIREBASE_URI', isProduction ? 'https://trail-app.firebaseio.com/' : 'https://trail-app-dev.firebaseio.com/');

var Firebase = require('firebase');
var rootRef = new Firebase(app.get('FIREBASE_URI'));

var invitation = require('./routes/invitation')(rootRef);

// Routes
app.get('/invitation/:id', invitation.accept);

var port = app.get('port');
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

rootRef.child('emails_to_send').on('child_added', function(emailSnap) {
  var email = emailSnap.val();
  mail.send(email);

  // Remove it now that we've processed it.
  emailSnap.ref().remove();
});