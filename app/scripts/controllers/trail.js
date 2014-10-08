'use strict';

angular.module('trailApp')
  .controller('TrailCtrl', ['$scope', '$stateParams', '$firebase', 'FIREBASE_URI', 'UserService',
    function ($scope, $stateParams, $firebase, FIREBASE_URI, UserService) {
//    var trail = $scope.$parent.trails[$stateParams.trailId];
    var ref = new Firebase(FIREBASE_URI).child('trails').child($stateParams.trailId);
    var sync = $firebase(ref);
    var record = sync.$asObject();

    record.$loaded().then(function(trail) {
      //      $scope.trail.dueDate = UtilsService.getTimeLeftAsString(trail.dueDate);
      trail.dueDate = '10 days';
      trail.types = ['code', 'comment', 'meeting'];
      trail.type = 'comment';

      trail.$bindTo($scope, 'trail');
    });

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

    $scope.searchUser = function (val) {
//      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
//        params: {
//          address: val,
//          sensor: false
//        }
//      }).then(function (response) {
//        return response.data.results.map(function (item) {
//          return item.formatted_address;
//        });
//      });

      return UserService.searchUserByName(val);
    };
  }]);
