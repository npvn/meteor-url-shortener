Tinytest.add('Errors collection works', function(test) {
	test.equal(Errors.collection.find({}).count(), 0);
	Errors.throw('A new test error');
	test.equal(Errors.collection.find({}).count(), 1);
	Errors.collection.remove({});
});

Tinytest.addAsync('Errors template works', function(test, done) {
	Errors.throw('A new test error');
	test.equal(Errors.collection.find({ seen: false }).count(), 1);
	
	// render the template
	OnscreenDiv(Spark.render(function() {
		return Template.meteorErrors();
	})); 
	
	// wait a few milliseconds
	Meteor.setTimeout(function() {
		test.equal(Errors.collection.find({ seen: false }).count(), 0);
		test.equal(Errors.collection.find({}).count(), 1);
		Errors.clearSeen();
		
		test.equal(Errors.collection.find({ seen: true }).count(), 0);
		done();
	}, 500);
});