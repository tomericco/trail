'use strict';

angular.module('trailApp')
  .controller('TrailCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$firebase', 'FIREBASE_URI', 'UserService', 'TrailService', 'AuthService',
  function ($rootScope, $scope, $state, $stateParams, $firebase, FIREBASE_URI, UserService, TrailService, AuthService) {
    var ref = new Firebase(FIREBASE_URI).child('trails').child($stateParams.trailId);
    var sync = $firebase(ref);
    var record = sync.$asObject();

    record.$loaded().then(function(trail) {
      //      $scope.trail.dueDate = UtilsService.getTimeLeftAsString(trail.dueDate);
      if (!trail.created) {
        $scope.trail = null;
        return;
      }
      trail.dueDate = '10 days';
      trail.types = ['code', 'comment', 'meeting'];
      trail.type = 'comment';

      trail.$bindTo($scope, 'trail');
    });

    $scope.addBrick = function (brick) {
      var now = new Date().getTime();

      if (brick && !_.isEmpty(brick.content)) {
        $scope.trail.bricks = $scope.trail.bricks || [];
        $scope.trail.bricks.push({
          type: brick.type,
          content: brick.content,
          created: now,
          author: $rootScope.loggedInUser.id
        });

        return true;
      } else {
        return false;
      }

    };

    $scope.addContributor = function (contributor) {
      $scope.userSearchQuery = '';
      $scope.showUserSearchInput = false; // Hide search user input
      $scope.trail.contributors = $scope.trail.contributors || [];
      $scope.trail.contributors.push(contributor);

      UserService.addTrailToUser(contributor.id, $scope.trail.$id, 'CONTRIBUTOR');

      //TODO Send Email notification to user
    };

    $scope.setAddBrickType = function (type) {
      $scope.trail.type = type;
    };

    $scope.searchUser = function (val) { //TODO Move implementation to a service
      return UserService.getUserByEmail(val).then(function (user) {
        if (user) {
          var contibsToAdd = _.filter([user], function (user) {
            var currentContribEmails = _.pluck($scope.trail.contributors, 'email');
            return !_.contains(user.email, currentContribEmails)
          });

          return contibsToAdd;
        }
      });
    };

    $scope.deleteTrail = function () {
      $state.go('home');
      TrailService.deleteTrail($stateParams.trailId).then(function () {
        UserService.removeTrailFromUser($rootScope.loggedInUser.id, $stateParams.trailId).then(function () {
          //TODO Show delete notification
        });
      });
    };

    $scope.markAsDone = function () {
      TrailService.markAsDone($stateParams.trailId);
    };
  }]);
