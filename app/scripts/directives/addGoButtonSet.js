'use strict';

angular.module('trailApp')
  .directive('addGoButtonSet', function () {
    return {
      scope: true,
      replace: 'true',
      restrict: 'AE',
      template:
        '<span>' +
          '<span class="goToTrailBtn glyphicon glyphicon-chevron-right"></span>' +
          '<span class="addTrailBtn glyphicon glyphicon-plus"></span>' +
        '</span>',
      link: function (scope, el) {
        var addBtn = el.children('.addTrailBtn'),
          goToBtn = el.children('.goToTrailBtn');

        function addTrail() {
          var id = _.uniqueId('trail_'),
            name = scope.trailName;

          scope.addTrail(id, name);
          scope.id = id;
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
          addTrail();
          scope.goToTrail(scope.id);
        });
      }
    };
  });