'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$rootScope', '$scope', 'FIREBASE_URI', 'UserService', 'TrailService', 'AuthService',
    function ($rootScope, $scope, FIREBASE_URI, UserService, TrailService, AuthService) {
      var trailsRef = new Firebase(FIREBASE_URI).child('trails');
      var usersRef = new Firebase(FIREBASE_URI).child('users');

      $scope.mainTitle = 'Every product development is a journey.\nTrail helps you being collaborative and efficient.';
      $scope.tryNowTitle = 'Try it now, it\'s free!';
      $scope.trails = {};

      if (!AuthService.isUserLoggedIn()) {
        $rootScope.loggedInUser = null;
      } else {
        var user = AuthService.getUserCookie();

        UserService.getUserByEmail(user.google.email).then(function (persistedUser) {
          onUserLoggedIn(persistedUser);
        }, function onUserNotFound() {
          var loggedInUser = UserService.persistUser(user);
          onUserLoggedIn(loggedInUser);
        });
      }

      function onUserLoggedIn(loggedInUser) {
        $rootScope.loggedInUser = loggedInUser;

        TrailService.getTrailsByUserId(loggedInUser.id).then(function (trails) {
          $scope.trails = trails || {};
        });

        var loggedInUserTrailsRef = usersRef.child(loggedInUser.id).child('trails');

        // Handle add trail when other user adds me to his trail
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
      }

      $scope.loginWithGoogle = function () {
        AuthService.loginWithGoogle().then(function (loggedInUser) {
          if (AuthService.isValidGoogleUser(loggedInUser)) {
            onUserLoggedIn(loggedInUser);
          }
        },
        function onLoginError(error) {
          $rootScope.loggedInUser = null;

          //TODO Show login error
        });
      };

      $scope.addTrail = function (name) {
        var currentTime = new Date().getTime();
        var newTrail = {
          name: name,
          owner: $rootScope.loggedInUser.id,
          bricks: [],
          contributors: [$rootScope.loggedInUser],
          created: currentTime,
          updated: currentTime
        };

        var newTrailRef = trailsRef.push();
        var newTrailId = newTrailRef.name();

        // Improve perceived performance by putting immediately the new trail on the list
        $scope.trails[newTrailId] = newTrail;

        newTrailRef.setWithPriority(newTrail, $rootScope.loggedInUser.id, function (error) {
          if (!error) {
            UserService.addTrailToUser($rootScope.loggedInUser.id, newTrailRef.name(), 'OWNER');
          }
        });

        $scope.trailName = '';

        return newTrailId;
      };

      $scope.goToTrail = function (id) {
          window.location.href = '#/trail/' + id;
      };

      $scope.addAndGoToTrail = function (name) {
        var trailId = $scope.addTrail(name);

        $scope.goToTrail(trailId);
      };

      $scope.deleteTrail = function (id) {
        delete $scope.trails[id];
      };

      $scope.emptyInput = function (event) {
        event.target.value = '';
      };

      $scope.isTrailOwner = function (trailId) {
        return $rootScope.loggedInUser.trails[trailId] === 'OWNER';
      };
    }]);
