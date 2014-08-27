'use strict';

angular.module('trailApp')
  .controller('TrailCtrl', ['$scope', '$stateParams', 'TrailService', 'UtilsService', function ($scope, $stateParams, TrailService, UtilsService) {
    $scope.dueDate = '10 days';
    $scope.types = ['code', 'comment', 'meeting'];
    $scope.type = 'comment';

    $scope.addBrick = function (brick) {
      $scope.bricks.push({
        type: brick.type,
        content: brick.content,
        time: new Date()
      });
    };

    $scope.setAddBrickType = function (type) {
      $scope.type = type;
    };

    var trail = $scope.$parent.trails[$stateParams.trailId];

    if (trail) {
      $scope.bricks = trail.bricks;
      $scope.contributors = trail.contributors;
      $scope.dueDate = UtilsService.getTimeLeftAsString(trail.dueDate);
      $scope.name = trail.name;
    }
  }]);
