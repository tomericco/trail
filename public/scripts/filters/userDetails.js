'use strict';

angular.module('trailApp').
  filter('userDetails', [function() {
    return function(typingUserIds, usersDetails, loggedInUserId) {
      var user,
        typingUsers = [];

      _.forEach(typingUserIds, function (status, typingUserId) {
        user = _.find(usersDetails, function (userDetails) {
          return userDetails.id === typingUserId;
        });
        typingUsers.push(user);
      });

      var removeIndex = _.findIndex(typingUsers, { id: loggedInUserId });

      if (removeIndex > -1) {
        typingUsers.splice(removeIndex, 1);
      }

      return _.pluck(typingUsers, 'name').join(', ') + (typingUsers.length === 1 ? ' is ' : ' are ') + 'typing...';
    };
  }]);