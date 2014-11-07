'use strict';

angular.module('trailApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angularMoment',
  'ui.router',
  'firebase',
  'ui.bootstrap',
  'ui.utils'
]).config(function ($stateProvider, $urlRouterProvider, $logProvider) {
  $stateProvider.state('trail', {
    url: '/trail/:trailId',
    templateUrl: 'views/trail.html',
    controller: 'TrailCtrl'
  }).state('home', {
    url: '/home',
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  }).state('root', {
      url: '/',
      controller: function ($state) {
          $state.go('home');
      }
  });

  $logProvider.debugEnabled(true);
}).provider('FIREBASE_URI', [function () {
  this.$get = function() {
    var hostname = window.location.hostname;
    var firebaseUri = 'https://trail-app.firebaseio.com/';

    if (hostname === 'localhost') {
      firebaseUri = 'https://trail-app-dev.firebaseio.com/';
    }

    return firebaseUri;
  };
}]).constant('TrailStatus', {
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
});
