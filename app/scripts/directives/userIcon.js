'use strict';

angular.module('trailApp')
  .directive('userIcon', [function () {
    return {
      transclude: true,
      scope: true,
      replace: 'true',
      restrict: 'E',
      template: '<div class="brickUserIcon"><img class="avatar" src="" /></div>',
      link: function (scope, el, attrs) {
        var user = _.find(scope.contributors, { id: attrs.userId });
        var iconEl = $(el.children()[0]);

        if (user) {
          iconEl.attr('src', user.avatar);
        } else {
          iconEl.attr('src', 'https://avatars2.githubusercontent.com/u/1524181?s=40');
        }

      }
    };
  }]);