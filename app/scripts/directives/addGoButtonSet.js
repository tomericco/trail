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
          var name = scope.trailName.trim();

          scope.id = scope.addTrail(name);
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