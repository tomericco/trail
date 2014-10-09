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
        var id = trailsRef.push();
        id.setWithPriority(newTrail, currentTime, function (error) {
          //TODO Handle error
        });

        $scope.trailName = '';

        return id.name();
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
