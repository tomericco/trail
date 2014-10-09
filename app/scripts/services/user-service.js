'use strict';

angular.module('trailApp')
  .factory('UserService', ['$firebase', 'FIREBASE_URI', function ($firebase, FIREBASE_URI) {
    var usersRef = new Firebase(FIREBASE_URI).child('users');
    var self = {};

    self.getUserById = function (id) {
      var user = $firebase(usersRef.child(id)).$asObject();

      return user.$loaded().then(function(data) {
        return data;
      });
    };

    self.persistUser = function (user) {
      switch (user.provider) {
        case 'google':
          return persistGoogleUser(user);
      }
    };

    self.searchUserByName = function (name) {
      var searchQuery = usersRef.limit(10);
    };

    function persistGoogleUser(user) {
      var userPersistedObj = {};

      userPersistedObj[user.uid] = {
        id: user.uid,
        avatar: user.thirdPartyUserData.picture,
        name: user.thirdPartyUserData.name,
        email: user.email
      };

      usersRef.set(userPersistedObj);

      return userPersistedObj;
    }

    return self;
  }]);