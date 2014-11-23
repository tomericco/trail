var _ = require('lodash');
var sendgrid = require('sendgrid')('tomericco', 'Startup18');
var mailTemplates = require('../misc/mail-templates');

module.exports = {
  send: function (params) {
    var templateId = params.templateId;
    var templateParams = params.templateParams;
    var recipient = params.recipient;
    var recipientName = params.recipientName;

    if (_.isEmpty(templateId) || _.isEmpty(templateParams) || _.isEmpty(recipient)) {
      return;
    }

    if (_.isEmpty(recipientName)) {
      recipientName = recipient;
    }

    mailTemplates.build(templateId, templateParams, function (err, data) {
      var params = {
        smtpapi: new sendgrid.smtpapi(),
        to: [recipient],
        toname: [recipientName],
        from: 'noreply@mytrail.io',
        fromname: 'Trail',
        subject: data.subject,
        html: data.body,
        date: new Date()
//                    replyto:  '' // What is it being used for?
      };

      var email = new sendgrid.Email(params);

      sendgrid.send(email, function (err, json) {
        console.log(err || json);
      });
    });
  }
};
