'use strict';

angular.module('trailApp')
  .controller('MainCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.bricks = [{
            type: 'comment',
            author: '1',
            content: 'Hi guys! Let\'s start rockin\'!',
            time: new Date() - 100000 * 34
        },
        {
            type: 'meeting',
            author: '2',
            content: {
                time: '10:00',
                location: "Adam's office",
                purpose: "Feature kickoff",
                participants: [
                    {id: 'tomer', avatar: 'https://avatars0.githubusercontent.com/u/352023?s=40'},
                    {id: 'natalie', avatar: 'https://avatars0.githubusercontent.com/u/31323?s=40'},
                    {id: 'mika', avatar: 'https://avatars0.githubusercontent.com/u/3520?s=40'}
                ]
            },
            time: new Date() - 100000 * 28
        },
        {
            type: 'code',
            author: '3',
            content: {
                author: 'tomericco',
                commits: [
                    {
                        id: '5fd4x5s',
                        message: 'Stubs for managing components',
                        url: ''
                    },
                    {
                        id: '34fgd32',
                        message: 'Implement stubs',
                        url: ''
                    },
                    {
                        id: '22wd45f',
                        message: 'Adding unit tests for components service',
                        url: ''
                    }
                ]
            },
            time: new Date() - 100000 * 23
        },
        {
            type: 'comment',
            author: '1',
            content: 'Tomer, I have added a few comments on your commits. Please review.',
            time: new Date() - 100000 * 20
        }
    ];
    $scope.types = ['code', 'comment', 'meeting'];
    $scope.type = 'comment';
    $scope.contributors = [];

    $scope.addBrick = function (brick) {
      $scope.bricks.push({
        type: brick.type,
        content: brick.content,
        time: new Date()
      });
    };

    $scope.showContributors = function () {
      var featureId = '000';
      UserService.getContributors(featureId, function (users) {
        $scope.contributors = users;
      });
    };

    $scope.setAddBrickType = function (type) {
      $scope.type = type;
    };

    $scope.showContributors();
  }]);
