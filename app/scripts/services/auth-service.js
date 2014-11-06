'use strict';

angular.module('trailApp')
  .factory('AuthService', ['$q', 'TrailService', 'UserService', 'FIREBASE_URI',
  function ($q, TrailService, UserService, FIREBASE_URI) {
    var self = {};
    var rootRef = new Firebase(FIREBASE_URI);
    var deferred = $q.defer();
    var loggedInUser = {};

    function handleLoginResponse(error, authData) {
      if (error) {
        if (error.code === "TRANSPORT_UNAVAILABLE") {
            // fall-back to browser redirects, and pick up the session
            // automatically when we come back to the origin page
            rootRef.authWithOAuthRedirect("google", handleLoginResponse);
        }

        // an error occurred while attempting login
        deferred.reject(error);
      } else if (authData.google) {
        // user authenticated with Firebase
        UserService.getUserByEmail(authData.google.email).then(function userExistsCallback(persistedUser) {
          return persistedUser;
        },function userNotExistsCallback() {
          var persistedUser = UserService.persistUser(authData);

          return persistedUser;
        }).then(function (persistedUser) {
          // Clone persisted object to remove 3 way binding for this variable
          angular.extend(loggedInUser, persistedUser);
          deferred.resolve(loggedInUser);
        });
      } else {
        // user is logged out
        deferred.resolve(null);
      }
    }

    self.loginWithGoogle = function () {
      rootRef.authWithOAuthPopup("google", handleLoginResponse, {
        remember: "sessionOnly",
        scope: "email"
      });

      return deferred.promise;
    };

    self.isValidGoogleUser = function (user) {
        return user !== null && user.id;
    };

    self.isUserLoggedIn = function () {
      return rootRef.getAuth() !== null;
    };

    self.getUserCookie = function () {
      return rootRef.getAuth();
    };

    return self;
  }]);