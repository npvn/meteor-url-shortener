
Template.redirect.rendered = function() {
    var targetURL = this.data.targetURL;

    // Since I have set the current data context to be reactive, I have to use a server-side method to update visit count (instead of updating on client-side)
    Meteor.call('incrementVisitCount', this.data._id , function(error, result) {
        if (error) Errors.throw(error.reason);
        else window.location = targetURL; // console.log(result);
    });
};