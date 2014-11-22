'use strict';

angular.module('trailApp')
  .factory('UtilsService', ['$window', '$location', function ($window, $location) {
    var self = {};

    self.getTimeLeftAsString = function (date) {
      return '10 days';
    };

    /* Taken from: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript */
    self.isValidEmail = function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    self.getInvitationUrl = function (invitationId) {
      return $window.location.origin + '/invitation/' + invitationId;
    };

    self.getQueryParamValue = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);

        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    self.getTrailUrl = function (trailId) {
      return $window.location.origin + '/#/trail/' + trailId;
    };

    self.isTrailUrl = function (url) {
        return true; //TODO Implement
    };

    self.shakeElement = function (el) {
      el.addClass('animated shake');
      setTimeout(function () {
        el.removeClass('animated shake');
      }, 700);
    };

    return self;
  }]);