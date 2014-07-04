'use strict';

angular.module('trailApp')
  .directive('meetingBrick', function () {
    return {
      scope: true,
      replace: 'true',
      restrict: 'A',
      templateUrl: 'views/meeting-brick.html',
      link: function (scope, el) {

      }
    };
  });