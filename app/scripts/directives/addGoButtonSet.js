'use strict';

angular.module('trailApp')
  .directive('addGoButtonSet', ['UtilsService', function (UtilsService) {
    return {
      scope: true,
      replace: 'true',
      restrict: 'AE',
      template:
        '<span>' +
          '<span style="visibility: hidden;" class="goToTrailBtn glyphicon glyphicon-chevron-right"></span>' +
          '<span class="addTrailBtn glyphicon glyphicon-plus"></span>' +
        '</span>',
      link: function (scope, el) {
        var addBtn = el.children('.addTrailBtn'),
          goToBtn = el.children('.goToTrailBtn');

        function addTrail() {
          var name = scope.trailName;

          if (!_.isEmpty(name)) {
            scope.id = scope.addTrail(name);

            return true;
          } else {
            return false;
          }
        }

        addBtn.bind('mouseenter', function () {
          goToBtn.css('visibility', 'visible');
        });

        el.bind('mouseleave', function () {
          goToBtn.css('visibility', 'hidden');
        });

        addBtn.bind('click', function () {
          var trailAdded = addTrail();

          if (!trailAdded) {
            UtilsService.shakeElement(el.parent());
          }
        });

        goToBtn.bind('click', function () {
          var trailAdded = addTrail();

          if (trailAdded) {
            scope.goToTrail(scope.id);
          } else {
            UtilsService.shakeElement(el.parent());
          }
        });
      }
    };
  }]);