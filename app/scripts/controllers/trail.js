'use strict';

angular.module('trailApp')
  .controller('TrailCtrl', ['$scope', '$stateParams', '$firebase', 'FIREBASE_URI',
    function ($scope, $stateParams, $firebase, FIREBASE_URI) {
//    var trail = $scope.$parent.trails[$stateParams.trailId];
    var ref = new Firebase(FIREBASE_URI).child('trails').child($stateParams.trailId);
    var sync = $firebase(ref);
    var trail = sync.$asObject();

    if (trail) {
      $scope.trail = trail;
//      $scope.trail.dueDate = UtilsService.getTimeLeftAsString(trail.dueDate);
      $scope.trail.dueDate = '10 days';
      $scope.trail.types = ['code', 'comment', 'meeting'];
      $scope.trail.type = 'comment';

      trail.$bindTo($scope, 'trail');
    }

    $scope.addBrick = function (brick) {
      $scope.trail.bricks = $scope.trail.bricks || [];
      $scope.trail.bricks.push({
        type: brick.type,
        content: brick.content,
        time: new Date()
      });
    };

    $scope.addContributor = function (contributor) {
      $scope.trail.contributors = $scope.trail.contributors || [];
      $scope.trail.contributors.push(contributor);
    };

    $scope.setAddBrickType = function (type) {
      $scope.trail.type = type;
    };
  }]);
