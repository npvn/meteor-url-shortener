Template.home.events({
    'submit form': function(e) {
        e.preventDefault();

        var url = {
            targetURL: $(e.target).find('[name=longURL]').val(),
            shortURL: $(e.target).find('[name=shortURL]').val(),
            numVisit: 0,
            showPublic: $(e.target).find('[name=options]').val()
        }

        console.log(url.showPublic);
    }
});