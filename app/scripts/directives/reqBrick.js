'use strict';

angular.module('trailApp')
    .directive('reqBrick', function () {
        return {
            scope: true,
            replace: 'true',
            restrict: 'A',
            templateUrl: 'views/req-brick.html',
            link: function (scope, el) {

            }
        };
    });