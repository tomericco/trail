'use strict';

angular.module('trailApp')
  .directive('userIcon', [function () {
    return {
      restrict: 'E',
      template: '<div class="brickUserIcon"><img class="avatar" src="" /></div>',
      link: function (scope, el, attrs) {
        var user = _.find(scope.trail.contributors, { id: attrs.userId });
        var iconEl = $(el.find('.avatar')[0]);

        if (user) {
          iconEl.attr('src', user.avatar);
        } else {
          //TODO Put anonymous avatar
          iconEl.attr('src', 'https://avatars2.githubusercontent.com/u/1524181?s=40');
        }
      }
    };
  }]);