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

      var removeIndex = _.findIndex(typingUserNames, { id: loggedInUserId });
      typingUserNames.splice(removeIndex, 1);

      return _.pluck(typingUserNames, 'name').join(', ');
    };
  }]);