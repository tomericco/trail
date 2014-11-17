var sendgrid  = require('sendgrid')('tomericco', 'Tomer1986');

module.exports = {
    main: function(req, res) {
        res.send('Hello from mail service!');

        var email = new sendgrid.Email({
            to: 'tomer.gabbai@gmail.com',
            from: 'no_reply@mytrail.io',
            subject: 'Mail from Trail!',
            text: 'Ta-Da !'
        });

        sendgrid.send(email, function(err, json) {
            if (err) { return console.error(err); }
            console.log(json);
        });
    }
};
