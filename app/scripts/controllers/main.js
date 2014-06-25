'use strict';

angular.module('trailApp')
.controller('MainCtrl', function ($scope) {
  $scope.bricks = [
    {
      name: "Dummy brick",
      time: new Date()
    },
    {
      name: "Dummy brick",
      time: new Date()
    },
    {
      name: "Dummy brick",
      time: new Date()
    },
    {
      name: "Dummy brick",
      time: new Date()
    },
    {
      name: "Dummy brick",
      time: new Date()
    },
    {
      name: "Dummy brick",
      time: new Date()
    },
    {
      name: "Dummy brick",
      time: new Date()
    },
    {
      name: "Dummy brick",
      time: new Date()
    },
    {
      name: "Dummy brick",
      time: new Date()
    }
  ];

  $scope.addBrick = function (brick) {
    $scope.bricks.push({
      name: brick.name,
      time: new Date()
    });
  };
});
