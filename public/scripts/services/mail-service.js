'use strict';

angular.module('trailApp')
  .factory('MailService', function () {
    var self = {};

    self.sendEmailInvitation = function (email, trailId) {
      console.log('Sending email to: ' + email);
      //TODO Implement email integration
    };

    return self;
  });