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
          scope.trail.typersCount = _(scope.trail.typing).remove(scope.loggedInUser.id).size();

          timeoutPromise = $timeout(function () {
            delete scope.trail.typing[scope.loggedInUser.id];
            scope.trail.typersCount = _(scope.trail.typing).remove(scope.loggedInUser.id).size();
          }, 1000);
        });
      }
    };
  }]);