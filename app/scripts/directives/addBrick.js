'use strict';

angular.module('trailApp')
  .directive('addBrick', function () {
    return {
      transclude: true,
      replace: 'true',
      restrict: 'A',
      templateUrl: 'views/add-brick.html',
      link: function (scope, el) {
        var tabs = el.find('li');
        tabs.on('click', function (event) {
          var parent = $(event.target.parentElement);
          if (!parent.hasClass('active')) {
            tabs.removeClass('active');
            parent.addClass('active');
          }
        });

        $('.meetingTimePicker').clockpicker({
          autoclose: true
        });

        scope.participants = [];

        scope.toggleMeetingParticipant = function (event, participant) {
          var el = $(event.target);
          el.toggleClass('markedOut');

          var participant = _.find(this.participants, { id: participant.id });
          participant.attending = true;
        };

        scope.addMeetingBrick = function () {
          var goingParticipants = _.filter(this.participants, function (participant) {
            return !participant.attending;
          });
          var brickObj = {
            type: 'meeting',
            content: {
              day: $(el).find('#meetingDayInput').val(),
              time: $(el).find('#meetingTimeInput').val(),
              location: $(el).find('#meetingLocationInput').val(),
              purpose: 'sync',
              participants: goingParticipants
            }
          };

          this.addBrick(brickObj);
        };

        scope.setMeetingParticipants = function (contributor) {
          this.participants.push(contributor);
        };
      }
    };
  });