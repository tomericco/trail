'use strict';

angular.module('trailApp')
  .controller('HomeCtrl', ['$rootScope', '$scope', '$window', 'FIREBASE_URI', 'UserService', 'TrailService', 'AuthService', 'UtilsService',
    function ($rootScope, $scope, $window, FIREBASE_URI, UserService, TrailService, AuthService, UtilsService) {
      var trailsRef = new Firebase(FIREBASE_URI).child('trails');
      var usersRef = new Firebase(FIREBASE_URI).child('users');
      var unregisterOnUserLoggedIn;

      $scope.mainTitle = 'Every product development is a journey.\nTrail helps you being collaborative and efficient.';
      $scope.tryNowTitle = 'Try it now, it\'s free!';
      $scope.trails = {};

      if ($rootScope.loggedInUser) {
        loadTrailsList();
      } else {
        unregisterOnUserLoggedIn = $scope.$on('onUserLoggedIn', loadTrailsList);
      }

      function loadTrailsList() {
        var loggedInUser = $rootScope.loggedInUser;

        // Get trails the user own
        TrailService.getTrailsByUserId(loggedInUser.id).then(function (trails) {
          angular.extend($scope.trails, trails);
        });

        var loggedInUserTrailsRef = usersRef.child(loggedInUser.id).child('trails');

        // Handle add trail when other user adds the user to his trail
        loggedInUserTrailsRef.on('child_added', function (snap) {
          var trailId = snap.name();
          TrailService.getTrailById(trailId).then(function (trail) {
            $scope.trails[trailId] = trail;
          });
        });

        unregisterOnUserLoggedIn && unregisterOnUserLoggedIn();
      }

      $scope.loginWithGoogle = function () {
        AuthService.loginWithGoogle().then(function (loggedInUser) {
            if (AuthService.isValidGoogleUser(loggedInUser)) {
              $rootScope.loggedInUser = loggedInUser;

              //TODO Move redirect code to auth service somehow
              var redirectUrl = UtilsService.getQueryParamValue('redirect');
              if (redirectUrl && UtilsService.isTrailUrl(redirectUrl)) {
                  $window.location.href = redirectUrl;
              } else {
                  loadTrailsList();
              }
            } else {
              console.error('Invalid Google user', loggedInUser);
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
        if (!_.isEmpty(name)) {
          var trailId = $scope.addTrail(name);

          $scope.goToTrail(trailId);
        } else {
          $scope.$broadcast('shake');
        }
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
