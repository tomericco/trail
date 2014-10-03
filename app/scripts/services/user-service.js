'use strict';

angular.module('trailApp')
  .factory('UserService', function () {
    var self = {};

    self.getUserById = function (id) {
      if (id === 'google:108573017193457783775') {
        return {
          avatar: 'https://avatars2.githubusercontent.com/u/1524181?s=40',
          id: 'google:108573017193457783775',
          name: 'Joey'
        }
      }
    };

    return self;
  });