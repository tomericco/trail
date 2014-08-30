'use strict';

angular.module('trailApp')
  .controller('TrailCtrl', ['$scope', '$stateParams', 'UtilsService', function ($scope, $stateParams, UtilsService) {
    $scope.dueDate = '10 days';
    $scope.types = ['code', 'comment', 'meeting'];
    $scope.type = 'comment';

    $scope.addBrick = function (brick) {
      $scope.bricks.$add({
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
      $scope = trail;
      $scope.dueDate = UtilsService.getTimeLeftAsString(trail.dueDate);
    }
  }]);
