'use strict';

angular.module('trailApp')
  .factory('FeatureService', function () {
    var dummyFeatures = {
        '1': {
          bricks: [{
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
                {
                  id: '1',
                  username: 'joey',
                  avatar: 'https://avatars2.githubusercontent.com/u/1524181?s=40'
                },
                {
                  id: '2',
                  username: 'ross',
                  avatar: 'https://avatars0.githubusercontent.com/u/7373209?s=40'
                }
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
          },
          {
              type: 'req',
              author: '3',
              content: {
                reqText: 'Add a popover on hover to user avatars',
                assignee: {
                  id: '1',
                  username: 'joey',
                  avatar: 'https://avatars2.githubusercontent.com/u/1524181?s=40'
                }
              },
              time: new Date() - 100000 * 18
          }
        ],
        contributors: [
          {
            id: '1',
            username: 'joey',
            avatar: 'https://avatars2.githubusercontent.com/u/1524181?s=40'
          },
          {
            id: '2',
            username: 'ross',
            avatar: 'https://avatars0.githubusercontent.com/u/7373209?s=40'
          },
          {
            id: '3',
            username: 'monica',
            avatar: 'https://avatars2.githubusercontent.com/u/1524182?s=40'
          },
          {
            id: '4',
            username: 'rachel',
            avatar: 'https://avatars0.githubusercontent.com/u/352113?s=40'
          }
        ]
      }
    };

    var self = {};

    self.getFeatureById = function (featureId, onSuccess, onFailure) {
      var feature = dummyFeatures[featureId];
      onSuccess(feature);
    };

    return self;
  });