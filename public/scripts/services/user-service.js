'use strict';

angular.module('trailApp')
  .factory('UserService', ['$q', '$firebase', 'FIREBASE_URI', function ($q, $firebase, FIREBASE_URI) {
    var usersRef = new Firebase(FIREBASE_URI).child('users');
    var trailsRef = new Firebase(FIREBASE_URI).child('trails');
    var invitationsRef = new Firebase(FIREBASE_URI).child('invitations');
    var self = {};

    self.getUserById = function (id) {
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

    self.getUserByEmailAndPersistIfNeeded = function (email, user) {
      var deferred = $q.defer();

      this.getUserByEmail(email).then(function onUserFound(persistedUser) {
        return persistedUser;
      }, function onUserNotFound() {
        var userPersistenceDeferred = $q.defer();

        self.persistUser(user).then(function (persistedUser) {
          self.getUserInvitations(persistedUser.email).then(function (invitations) {
            debugger;
            _.forEach(invitations, function (invitation) {
              trailsRef.child(invitation.trailId).child('contributors').push(persistedUser);
              self.addTrailToUser(persistedUser.id, invitation.trailId, 'CONTRIBUTOR');
            });

            userPersistenceDeferred.resolve(persistedUser);
          });
        });

        return userPersistenceDeferred.promise;
      }).then(function (persistedUser) {
        deferred.resolve(persistedUser);
      });

      return deferred.promise;
    };

    self.addTrailToUser = function (userId, trailId, role) {
      usersRef.child(userId).child('trails').child(trailId).set(role);
    };

    self.removeTrailFromUser = function (userId, trailId) {
      var deferred = $q.defer();

      usersRef.child(userId).child('trails').child(trailId).remove(function onRemoveComplete(error) {
        deferred.resolve(error);
      });

      return deferred.promise;
    };

    self.getUserInvitations = function (email) {
      var deferred = $q.defer();

      invitationsRef.startAt(email)
        .endAt(email)
        .once('value', function(snap) {
          var invitations = snap.val();
          if (invitations) {
            deferred.resolve(_.values(invitations));
          } else {
            deferred.reject(null);
          }
        });

      return deferred.promise;
    };

    function persistGoogleUser(user) {
      var deferred = $q.defer();
      var id = usersRef.push();
      var userPersistedObj = {
        id: id.name(),
        avatar: user.google.cachedUserProfile.picture,
        name: user.google.cachedUserProfile.name,
        email: user.google.email,
        providerInfo: user.google,
        trails: []
      };

      id.setWithPriority(userPersistedObj, userPersistedObj.email, function (error) {
        if (!error) {
          deferred.resolve(userPersistedObj);
        } else {
          deferred.reject(error);
        }
      });

      return deferred.promise;
    }

    return self;
  }]);