'use strict';

angular.module('trailApp')
.factory('UserService', function () {
    var dummyContributors = [
      {
        id: '1',
        username: 'joey',
        avatar: 'https://avatars2.githubusercontent.com/u/1524181?s=40'
      },
      {
        id: '2',
        username: 'ross',
        avatar: 'https://avatars0.githubusercontent.com/u/7373209?s=40'
      },
      {
        id: '3',
        username: 'monica',
        avatar: 'https://avatars2.githubusercontent.com/u/1524182?s=40'
      },
      {
        id: '4',
        username: 'rachel',
        avatar: 'https://avatars0.githubusercontent.com/u/352113?s=40'
      }
    ];

    var self = {};

    self.addUser = function (user) {
        // TODO SERVER
    };

    self.getContributors = function (featureId, onSuccess, onFailure) {
      //TODO SERVER: Get users array from server
      onSuccess(dummyContributors);
    };

    self.addContributor = function (userId, featureId) {
      // TODO SERVER
    };

    self.getUserById = function (userId) {
      return _.find(dummyContributors, { id: userId });
    };

    return self;
  });