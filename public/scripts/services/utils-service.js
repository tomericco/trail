'use strict';

angular.module('trailApp')
  .factory('UtilsService', function () {
    var self = {};

    self.getTimeLeftAsString = function (date) {
      return '10 days';
    };

    /* Taken from: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript */
    self.isValidEmail = function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    return self;
  });