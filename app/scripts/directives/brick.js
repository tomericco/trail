'use strict';

angular.module('trailApp')
  .directive('brick', function () {
    return {
      scope: true,
      replace: 'true',
      restrict: 'A',
      templateUrl: 'views/brick.html',
      link: function (scope, el) {

      }
    };
  });