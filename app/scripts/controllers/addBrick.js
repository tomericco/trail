'use strict';

angular.module('trailApp')
  .controller('AddBrickCtrl', ['$scope', function ($scope) {
    $scope.participants = [];
    $scope.reqBox = 'Req here';
    $scope.commentBox = 'Comment here';

    $scope.setMeetingParticipants = function (contributor) {
      this.participants.push(contributor);
    };

    $scope.addCommentBrick = function (content) {
      $scope.addBrick({type: 'comment', content: content});
      $scope.commentContent = '';
    };

    $scope.addReqBrick = function (content) {
      var assignee = $scope.reqAssignee;

      $scope.addBrick({
        type: 'req',
        content: {
          reqText: content,
          assignee: assignee
        }
      });

      $scope.reqContent = '';
    };

    $scope.addMeetingBrick = function () {
      var goingParticipants = _.filter(this.participants, function (participant) {
        return !participant.attending;
      });
      var brickObj = {
        type: 'meeting',
        content: {
          day: $scope.meetingDay,
          time: $scope.meetingTime,
          location: $scope.meetingLocationInput,
          purpose: 'sync',
          participants: goingParticipants
        }
      };

      this.addBrick(brickObj);

      $scope.meetingTime = '';
      $scope.meetingLocation = '';
    };
  }]);