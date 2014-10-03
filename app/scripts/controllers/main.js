'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$scope', '$firebase', 'UserService', 'FIREBASE_URI',
    function ($scope, $firebase, UserService, FIREBASE_URI) {
      var ref = new Firebase(FIREBASE_URI).child('trails');
      var sync = $firebase(ref);
      var trails = sync.$asObject();

      if (!$scope.authClient) {
        $scope.authClient = new FirebaseSimpleLogin(ref, function(error, user) {
          if (error) {
            // an error occurred while attempting login
            console.log(error);
          } else if (user) {
            // user authenticated with Firebase
            console.log("User ID: " + user.uid + ", Provider: " + user.provider);
            $scope.loggedInUser = UserService.getUserById(user.uid);
            trails.$bindTo($scope, 'trails');
          } else {
            // user is logged out
            $scope.loggedInUser = null;
            $scope.authClient.login('google');
          }
        });
      }

      $scope.addTrail = function (id, name) {
        $scope.trails[id] = {
          id: id,
          name: name,
          owner: $scope.loggedInUser.id,
          bricks: [],
          contributors: []
        };
        $scope.trailName = '';
      };

      $scope.goToTrail = function (id) {
        // Push changes to server and only then go to trail (critical in add and go to scenario)
        trails.$save().then(function () {
          window.location.href = '#/trail/' + id;
        });
      };
  }]);
