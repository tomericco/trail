'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.bricks = [];
    $scope.types = ['code', 'comment', 'meeting'];
    $scope.type = 'comment';
    $scope.contributors = [];

    $scope.addBrick = function (brick) {
      $scope.bricks.push({
        type: brick.type,
        content: brick.content,
        time: new Date()
      });
    };

    $scope.showContributors = function () {
      var featureId = '000';
      UserService.getContributors(featureId, function (users) {
        $scope.contributors = users;
      });
    };

    $scope.setAddBrickType = function (type) {
      $scope.type = type;
    };

    $scope.showContributors();
  }]);
