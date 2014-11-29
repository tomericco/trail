'use strict';

angular.module('trailApp').
  filter('userDetails', [function() {
    return function(typingUserIds, usersDetails, loggedInUserId) {
      var user,
        typingUserNames = [];

      _.forEach(typingUserIds, function (status, typingUserId) {
        user = _.find(usersDetails, function (userDetails) {
          return userDetails.id === typingUserId;
        });
        typingUserNames.push(user);
      });

      return _(typingUserNames)
        .pluck('name')
        .remove(loggedInUserId)
        .join(', ');
    };
  }]);