'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$scope', '$firebase', 'FIREBASE_URI', 'UserService',
    function ($scope, $firebase, FIREBASE_URI, UserService) {
      var ref = new Firebase(FIREBASE_URI).child('trails');
      var sync = $firebase(ref);
      var trails = sync.$asObject();
      var loggedInUser = {};

      if (!$scope.authClient) {
        $scope.authClient = new FirebaseSimpleLogin(ref, function(error, user) {
          if (error) {
            // an error occurred while attempting login
            console.log(error);
          } else if (user) {
            // user authenticated with Firebase
            console.log("User ID: " + user.uid + ", Provider: " + user.provider);

            UserService.getUserById(user.uid).then(function (persistedUser) {
              if (!persistedUser.id) {
                persistedUser = UserService.persistUser(user);
              }
              // Clone persisted object to remove 3 way binding for this variable
              angular.extend(loggedInUser, persistedUser);

              $scope.loggedInUser = loggedInUser;
            });

            trails.$bindTo($scope, 'trails');
          } else {
            // user is logged out
            $scope.loggedInUser = null;
          }
        });
      }

      $scope.loginWithGoogle = function () {
        $scope.authClient.login('google');
      };

      $scope.addTrail = function (id, name) {
        $scope.trails[id] = {
          id: id,
          name: name,
          owner: $scope.loggedInUser.id,
          bricks: [],
          contributors: [$scope.loggedInUser]
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
