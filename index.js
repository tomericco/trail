var express = require('express');
var path = require('path');
var mail = require('./routes/mail');
var bodyParser = require('body-parser');

var app = express();
var isProduction = process && process.env && process.env.TRAIL_ENV === 'production';
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
  console.log('Environment: ' + (isProduction ? 'PRODUCTION' : 'LOCAL'));
  console.log('Firebase URL: ' + app.get('FIREBASE_URI'));
});

rootRef.child('emails_to_send').on('child_added', function(emailSnap) {
  console.log('Start preparing email to send...');

  var email = emailSnap.val();
  mail.send(email);

  // Remove it now that we've processed it.
  emailSnap.ref().remove();
  console.log('Email was sent to: ' + email.recipient);
});