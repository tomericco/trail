'use strict';

angular.module('trailApp')
  .directive('commentBrick', function () {
    return {
      scope: true,
      replace: 'true',
      restrict: 'A',
      templateUrl: 'views/comment-brick.html',
      link: function (scope, el) {

      }
    };
  });