if (URLs.find().count() === 0) {
    // create a default user
    var phucId = Meteor.users.insert({
        profile: {name: 'Phuc Nguyen', email: 'mail@nguyenphuc.info'}
    });
    var phuc = Meteor.users.find(phucId);
    // create a sample url
    URLs.insert({
       target: 'google.com',
       shortURL: 'a',
       userId: phucId,
       timeCreated: (new Date()).getTime(),
       timeModified: null,
       numVisit: 0,
       showPublic: true
    });
}