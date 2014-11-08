'use strict';

angular.module('trailApp')
  .directive('addGoButtonSet', function () {
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
          addTrail();
        });

        goToBtn.bind('click', function () {
          var trailAdded = addTrail();

          if (trailAdded) {
            scope.goToTrail(scope.id);
          }
        });
      }
    };
  });