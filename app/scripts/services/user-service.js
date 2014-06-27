'use strict';

angular.module('trailApp')
.factory('UserService', function () {
    var dummyContributors = [
      {
        id: '111',
        username: 'tomericco',
        avatar: 'https://avatars2.githubusercontent.com/u/1524181?s=40'
      },
      {
        id: '222',
        username: 'shuki',
        avatar: 'https://avatars0.githubusercontent.com/u/7373209?s=40'
      },
      {
        id: '333',
        username: 'lamlam',
        avatar: 'https://avatars2.githubusercontent.com/u/1524181?s=40'
      },
      {
        id: '444',
        username: 'foofoo',
        avatar: 'https://avatars0.githubusercontent.com/u/352053?s=40'
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

    return self;
  });