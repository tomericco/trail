'use strict';

angular.module('trailApp')
  .factory('UserService', function () {
    var self = {};

    self.getUserById = function (id) {
      if (id === 'logged') {
        return {
          avatar: 'https://avatars2.githubusercontent.com/u/1524181?s=40',
          id: 'logged',
          name: 'Joey'
        }
      }
    };

    return self;
  });