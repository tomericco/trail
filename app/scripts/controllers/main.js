'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$rootScope', '$scope', '$state', 'AuthService', 'UserService',
  function ($rootScope, $scope, $state, AuthService, UserService) {
    function navigateLoginScreen() {
      $rootScope.loggedInUser = null;

      setTimeout(function () { // Don't interfere digest loop
        $state.go('home');
      }, 0);
    }

    $rootScope.$on('$stateChangeStart', function () {
      if (!AuthService.isUserLoggedIn()) {
        navigateLoginScreen();
      }
    });
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState) {
        setTimeout(function () {
          $state.go('home');
        }, 0);
        console.log('State not found!', unfoundState.to);
      });

    if (!AuthService.isUserLoggedIn()) {
      navigateLoginScreen();
    } else {
      var user = AuthService.getUserCookie();

      UserService.getUserByEmailAndPersistIfNeeded(user.google.email, user).then(function (persistedUser) {
        $rootScope.loggedInUser = persistedUser;
        $scope.$broadcast('onUserLoggedIn');
      });
    }
  }]);