'use strict';

angular.module('trailApp')
  .directive('listenTyping', ['$timeout', function ($timeout) {
    return {
      scope: true,
      restrict: 'A',
      link: function (scope, el) {
        var timeoutPromise;

        el.keypress(function () {
          if (!scope.trail.typing) {
            scope.trail.typing = {};
          }

          if (timeoutPromise) {
            $timeout.cancel(timeoutPromise);
          }

          scope.trail.typing[scope.loggedInUser.id] = true;

          timeoutPromise = $timeout(function () {
            delete scope.trail.typing[scope.loggedInUser.id];
          }, 1000);
        });
      }
    };
  }]);