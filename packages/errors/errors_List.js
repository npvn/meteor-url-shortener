Template.meteorErrors.helpers({
	errors: function() { return Errors.collection.find(); }
});

Template.meteorError.rendered = function() {
	var error = this.data;
	Errors.collection.update(error._id, {$set: {seen: true}});
};