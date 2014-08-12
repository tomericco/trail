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

        scope.toggleMeetingParticipant = function (event, participant) {
          var el = $(event.target);
          el.toggleClass('markedOut');

          var participant = _.find(this.participants, { id: participant.id });
          participant.attending = true;
        };

        scope.setAsAssignee = function (event, participant) {
          var el = $(event.target).parent();
          el.removeClass('markedOut');
          el.siblings().addClass('markedOut');

          scope.reqAssignee = participant;
        };
      }
    };
  });