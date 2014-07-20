'use strict';

angular.module('trailApp')
  .factory('UtilsService', function () {
    var self = {};

    self.getTimeLeftAsString = function (date) {
      return '10 days';
    };

    return self;
  });