'use strict';

angular.module('trailApp')
  .directive('addBrick', function () {
    return {
      transclude: true,
      replace: 'true',
      restrict: 'A',
      templateUrl: 'views/add-brick.html',
      link: function (scope, el) {
        var tabs = el.find('li');
        tabs.on('click', function (event) {
          var parent = $(event.target.parentElement);
          if (!parent.hasClass('active')) {
            tabs.removeClass('active');
            parent.addClass('active');
          }
        });
      }
    };
  });