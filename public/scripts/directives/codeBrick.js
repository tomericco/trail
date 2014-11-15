'use strict';

angular.module('trailApp')
  .directive('codeBrick', function () {
    return {
      scope: true,
      replace: 'true',
      restrict: 'A',
      templateUrl: 'views/code-brick.html',
      link: function (scope, el) {

      }
    };
  });