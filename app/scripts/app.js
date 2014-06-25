'use strict';

angular.module('trailApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angularMoment'
])
  .config(function ($routeProvider, $logProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $logProvider.debugEnabled(true);
  });
