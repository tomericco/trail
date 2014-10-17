'use strict';

angular.module('trailApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angularMoment',
  'ui.router',
  'firebase',
  'ui.bootstrap'
]).config(function ($stateProvider, $urlRouterProvider, $logProvider) {
    $stateProvider.state('trail', {
      url: '/trail/:trailId',
      templateUrl: 'views/trail.html',
      controller: 'TrailCtrl'
    }).state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    });

    $logProvider.debugEnabled(true);
  }).constant('FIREBASE_URI', 'https://trail-app.firebaseio.com/');
