'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$scope', 'FeatureService', 'UtilsService', function ($scope, FeatureService, UtilsService) {
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

    $scope.loadFeature = function (featureId) {
      FeatureService.getFeatureById(featureId, function (feature) {
        $scope.bricks = feature.bricks;
        $scope.contributors = feature.contributors;
        $scope.dueDate = UtilsService.getTimeLeftAsString(feature.dueDate);
      });
    };

    $scope.loadFeature('1');
  }]);
