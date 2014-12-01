'use strict';

angular.module('trailApp').
  filter('userDetails', [function() {
    return function(typingUserIds, usersDetails, loggedInUserId) {
      var user,
        typingUsers = [],
        typingText = '';

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

      if (typingUsers.length === 1) {
        typingText += ' is typing...';
      } else if (typingUsers.length > 1) {
        typingText += ' are typing...';
      }

      return _.pluck(typingUsers, 'name').join(', ') + typingText;
    };
  }]);