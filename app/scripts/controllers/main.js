'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$scope', 'UserService', 'TrailService', function ($scope, UserService, TrailService) {
    $scope.loggedInUser = UserService.getUserById('logged');

    $scope.addTrail = function (id, name) {
      var trail = TrailService.addTrail(id, name);
      $scope.trails[id] = trail;
      $scope.$digest();
    };

    $scope.goToTrail = function (id) {
      window.location.href = '#/trail/' + id;
    };

    TrailService.getAllTrails(function (trails) {
      $scope.trails = trails;
    });
  }]);
