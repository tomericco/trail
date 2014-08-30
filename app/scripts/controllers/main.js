'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$scope', '$firebase', 'UserService', 'FIREBASE_URI',
    function ($scope, $firebase, UserService, FIREBASE_URI) {
      var ref = new Firebase(FIREBASE_URI).child('trails');
      var sync = $firebase(ref);
      var trails = sync.$asObject();

      trails.$bindTo($scope, 'trails');
      $scope.loggedInUser = UserService.getUserById('logged');

      $scope.addTrail = function (id, name) {
        var trail = {
          id: id,
          name: name,
          bricks: [],
          contributors: []
        };

        $scope.trails[id] = trail;
        $scope.trailName = '';
      };

      $scope.goToTrail = function (id) {
        window.location.href = '#/trail/' + id;
      };
  }]);
