Template.URLEdit.helpers({
    isChecked: function() {
        if (this.makePrivate) return 'checked';
        else return '';
    },
    isOwnURL: function() {
        return this.userId && this.userId === Meteor.userId(); // guard from null === null
    },
    reasonCannotEdit: function() {
        if ( !this.userId && !this.makePrivate ) return 'Anonymous public URLs cannot be edited.';
        else return 'Only the author can edit details of this URL.';
    }
});


Template.URLEdit.events({
   'submit form': function(e) {
        e.preventDefault();

        if ( longURLValidationStatus && shortURLValidationStatus ) {
            var url = this;
            url.shortURL = $(e.target).find('[name=shortURLInput]').val();
            url.targetURL = $(e.target).find('[name=longURLInput]').val();
            url.makePrivate = $(e.target).find('[name=makePrivate]').is(':checked');

            Meteor.call('/url/update', url, function(error, result) {
                if (error) Errors.throw(error.reason);
                else Router.go('urlPage', {shortURL: result});
            });
        }
   },

   'input #shortURLInput': executeShortURLValidation
});


Template.URLEdit.rendered = function() {
    setupTargetURLValidation();
};
