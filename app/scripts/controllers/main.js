'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$scope', '$firebase', 'FIREBASE_URI', 'UserService', 'TrailService',
    function ($scope, $firebase, FIREBASE_URI, UserService, TrailService) {
      var trailsRef = new Firebase(FIREBASE_URI).child('trails');
      var usersRef = new Firebase(FIREBASE_URI).child('users');
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

              TrailService.getTrailsByUserId($scope.loggedInUser.id).then(function (trails) {
                $scope.trails = trails || {};
              });

              var loggedInUserTrailsRef = usersRef.child($scope.loggedInUser.id).child('trails');

              loggedInUserTrailsRef.on('child_added', function (snap) {
                var trailId = snap.name();
                TrailService.getTrailById(trailId).then(function (trail) {
                  $scope.trails[trailId] = trail;
                });
              });

              loggedInUserTrailsRef.on('child_removed', function (snap) {
                //TODO
                debugger;
              });
            });
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
        var newTrailRef = trailsRef.push();
        var newTrailId = newTrailRef.name();

        // Improve perceived performance by putting immediately the new trail on the list
        $scope.trails[newTrailId] = newTrail;

        newTrailRef.setWithPriority(newTrail, $scope.loggedInUser.id, function (error) {
          if (!error) {
            UserService.addTrailToUser($scope.loggedInUser.id, newTrailRef.name(), 'OWNER');
          }
        });

        $scope.trailName = '';

        return newTrailId;
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
