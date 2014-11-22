module.exports = function (rootRef) {
  return {
    accept: function (req, res) {
      var invitationId = req.params.id;

      rootRef.child('invitations').child(invitationId).on('value', function(invitationSnap) {
        var invitation = invitationSnap.val();

        if (invitation) {
          res.redirect('/?redirect=' + invitation.redirectUrl);

          // Remove it now that we've processed it.
//          invitationSnap.ref().remove();
        }
      });
    }
  }
};