'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$scope', 'UserService', 'TrailService', function ($scope, UserService, TrailService) {
    $scope.loggedInUser = UserService.getUserById('logged');

    TrailService.getAllTrails(function (trails) {
      $scope.trails = trails;
    });
  }]);
