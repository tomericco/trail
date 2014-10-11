'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$scope', '$firebase', 'FIREBASE_URI', 'UserService',
    function ($scope, $firebase, FIREBASE_URI, UserService) {
      var trailsRef = new Firebase(FIREBASE_URI).child('trails');
      var sync = $firebase(trailsRef);
      var trails = sync.$asObject();
      var loggedInUser = {};

      $scope.mainTitle = 'Every product development is a journey.\nTrail helps you being collaborative and efficient.';
      $scope.tryNowTitle = 'Try it now, it\'s free!';

      if (!$scope.authClient) {
        $scope.authClient = new FirebaseSimpleLogin(trailsRef, function(error, user) {
          if (error) {
            // an error occurred while attempting login
            console.log(error);
          } else if (user) {
            // user authenticated with Firebase
            console.log("User ID: " + user.uid + ", Provider: " + user.provider);

            UserService.getUserByEmail(user.email).then(function userExistsCallback(persistedUser) {
              return persistedUser;
            },function userNotExistsCallback() {
              var persistedUser = UserService.persistUser(user);

              return persistedUser;
            }).then(function (persistedUser) {
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

      $scope.addTrail = function (name) {
        var currentTime = new Date().getTime();
        var newTrail = {
          name: name,
          owner: $scope.loggedInUser.id,
          bricks: [],
          contributors: [$scope.loggedInUser],
          created: currentTime,
          updated: currentTime
        };
        var trailId = trailsRef.push();
        trailId.setWithPriority(newTrail, currentTime, function (error) {
          if (!error) {
            UserService.addTrailToUser($scope.loggedInUser.id, trailId.name(), 'OWNER');
          }
        });

        $scope.trailName = '';

        return trailId.name();
      };

      $scope.goToTrail = function (id) {
        // Push changes to server and only then go to trail (critical in add and go to scenario)
        trails.$save().then(function () {
          window.location.href = '#/trail/' + id;
        });
      };

      $scope.deleteTrail = function (id) {
        delete $scope.trails[id];
      };
  }]);
