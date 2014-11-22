'use strict';

angular.module('trailApp')
  .factory('MailService', ['$http', '$q', 'FIREBASE_URI', 'UtilsService', function ($http, $q, FIREBASE_URI, UtilsService) {
    var emailsRef = new Firebase(FIREBASE_URI).child('emails_to_send');
    var invitationRef = new Firebase(FIREBASE_URI).child('invitations');
    var self = {};

    self.sendEmailInvitation = function (address, params) {
      var deferred = $q.defer();
      var invitationId = invitationRef.push().name();
      var mailObj = {
        recipient: address,
        templateId: 'INVITATION_TRAIL_CONTRIBUTOR',
        templateParams: {
          senderAddress: params.senderAddress,
          senderName: params.senderName,
          trailName: params.trailName,
          invitationUrl: UtilsService.getInvitationUrl(invitationId)
        }
      };

      emailsRef.push(mailObj, function (error) {
        if (error) {
          deferred.reject(error);
        } else {
          deferred.resolve();
        }
      });

      invitationRef.child(invitationId).setWithPriority({
        redirectUrl: encodeURIComponent(params.redirectUrl),
        trailId: params.trailId
      }, address);

      return deferred.promise;
    };

    return self;
  }]);