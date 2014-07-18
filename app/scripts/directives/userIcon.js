'use strict';

angular.module('trailApp')
  .directive('userIcon', ['UserService', function (userService) {
    return {
      transclude: true,
      replace: 'true',
      restrict: 'E',
      template: '<div class="brickUserIcon"><img class="avatar" src="" /></div>',
      link: function (scope, el, attrs) {
        var user = userService.getUserById(attrs.userId);
        var iconEl = $(el.children()[0]);
        iconEl.attr('src', user.avatar);
      }
    };
  }]);