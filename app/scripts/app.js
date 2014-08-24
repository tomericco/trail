'use strict';

angular.module('trailApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angularMoment',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $logProvider) {
    $stateProvider.state('trail', {
      url: '/trail/:trailId',
      templateUrl: 'views/trail.html',
      controller: 'TrailCtrl'
    }).state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    });
//    $routeProvider
//      .when('/', {
//        templateUrl: 'views/main.html',
//        controller: 'MainCtrl'
//      })
//      .otherwise({
//        redirectTo: '/'
//      });

    $logProvider.debugEnabled(true);
  });
