'use strict';

angular.module('trailApp').
  filter('userDetails', [function() {
    return function(userId, usersDetails) {
      var user = _.find(usersDetails, function (userDetails) {
        return userDetails.id === userId;
      });

      return user.name;
    };
  }]);