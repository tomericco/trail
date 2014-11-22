var fs = require('fs');
var _ = require('lodash');
var path = require('path');

var templates = {
  INVITATION_TRAIL_CONTRIBUTOR: {
    body: '', // To be filled by the template engine
    subject: 'A Trail needs your contribution',
    fileName: 'invitation-contributor.html'
  }
};
var fillPlaceholders = function (string, params) {
  var filledTemplate = string;

  _.forEach(params, function (val, key) {
    var placeholder = '{{' + key + '}}';
    var replaceRegex = new RegExp(placeholder, 'g');

    filledTemplate = filledTemplate.replace(replaceRegex, val)
  });

  return filledTemplate;
};

module.exports = {
  build: function (templateId, params, callback) {
    var template = templates[templateId];
    var filePath = path.join(__dirname + '/../resources/mail-templates/', template.fileName);

    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        callback(err);
      }
      template.body = fillPlaceholders(data, params);
      template.subject = fillPlaceholders(template.subject, params);

      callback(null, template);
    });
  }
};