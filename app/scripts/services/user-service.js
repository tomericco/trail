'use strict';

angular.module('trailApp')
  .factory('UserService', ['$q', '$firebase', 'FIREBASE_URI', function ($q, $firebase, FIREBASE_URI) {
    var usersRef = new Firebase(FIREBASE_URI).child('users');
    var self = {};

    self.getUserById = function (id) {
//      var user = $firebase(usersRef.child(id)).$asObject();
//
//      return user.$loaded().then(function(data) {
//        return data;
//      });
      var deferred = $q.defer();

      usersRef.startAt(id)
        .endAt(id)
        .once('value', function(snap) {
          if (snap.val()) {
            var user = _.values(snap.val())[0]; //TODO Find more elegant way for that
            deferred.resolve(user);
          } else {
            deferred.reject();
          }
        });

      return deferred.promise;
    };

    self.persistUser = function (user) {
      switch (user.provider) {
        case 'google':
          return persistGoogleUser(user);
      }
    };

    self.getUserByEmail = function (email) {
      var deferred = $q.defer();

      usersRef.startAt(email)
        .endAt(email)
        .once('value', function(snap) {
          if (snap.val()) {
            var user = _.values(snap.val())[0]; //TODO Find more elegant way for that
            deferred.resolve(user);
          } else {
            deferred.reject(null);
          }
        });

      return deferred.promise;
    };

    self.addTrailToUser = function (userId, trailId, role) {
      usersRef.child(userId + '/trails/' + trailId).set(role);
    };

    self.removeTrailFromUser = function (userId, trailId) {
      var deferred = $q.defer();

      usersRef.child(userId + '/trails/' + trailId).remove();

      return deferred.promise;
    };

    function persistGoogleUser(user) {
      var id = usersRef.push();
      var userPersistedObj = {
        id: id.name(),
        avatar: user.thirdPartyUserData.picture,
        name: user.thirdPartyUserData.name,
        email: user.email,
        trails: []
      };

      id.setWithPriority(userPersistedObj, userPersistedObj.email, function (error) {
        //TODO Handle error
      });

      return userPersistedObj;
    }

    return self;
  }]);