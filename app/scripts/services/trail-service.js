'use strict';

angular.module('trailApp')
  .factory('TrailService', ['$q', '$firebase', 'FIREBASE_URI', 'TrailStatus', function ($q, $firebase, FIREBASE_URI, TrailStatus) {
    var trailsRef = new Firebase(FIREBASE_URI).child('trails');
    var self = {};

    self.getTrailById = function (trailId) {
      var deferred = $q.defer();

      trailsRef.child(trailId).once('value', function (snap) {
        deferred.resolve(snap.val());
      });

      return deferred.promise;
    };

    self.getTrailsByUserId = function (userId) {
      var deferred = $q.defer();

      trailsRef
        .startAt(userId)
        .endAt(userId)
        .once('value', function(snap) {
          deferred.resolve(snap.val());
        });

      return deferred.promise;
    };

    self.markAsDone = function (trailId) {
      trailsRef.child(trailId).child('status').set(TrailStatus.DONE);
    };

    self.deleteTrail = function (trailId) {
      var deferred = $q.defer();

      trailsRef.child(trailId).remove(function () {
        deferred.resolve();
      });

      return deferred.promise;
    };

    return self;
  }]);