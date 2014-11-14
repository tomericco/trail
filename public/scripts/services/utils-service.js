'use strict';

angular.module('trailApp')
  .factory('UtilsService', function () {
    var self = {};

    self.getTimeLeftAsString = function (date) {
      return '10 days';
    };

    self.shakeElement = function (el) {
      el.addClass('animated shake');
      setTimeout(function () {
        el.removeClass('animated shake');
      }, 700);
    };

    return self;
  });