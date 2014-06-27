'use strict';

angular.module('trailApp')
.controller('MainCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.bricks = [
      {
        name: "Dummy brick",
        time: new Date()
      },
      {
        name: "Dummy brick",
        time: new Date()
      },
      {
        name: "Dummy brick",
        time: new Date()
      },
      {
        name: "Dummy brick",
        time: new Date()
      },
      {
        name: "Dummy brick",
        time: new Date()
      },
      {
        name: "Dummy brick",
        time: new Date()
      },
      {
        name: "Dummy brick",
        time: new Date()
      },
      {
        name: "Dummy brick",
        time: new Date()
      },
      {
        name: "Dummy brick",
        time: new Date()
      }
    ];
    $scope.contributors = [];

    $scope.addBrick = function (brick) {
      $scope.bricks.push({
        name: brick.name,
        time: new Date()
      });
    };

    $scope.showContributors = function () {
      var featureId = '000';
      UserService.getContributors(featureId, function (users) {
        $scope.contributors = users;
      });
    };

    $scope.showContributors();
  }]);
