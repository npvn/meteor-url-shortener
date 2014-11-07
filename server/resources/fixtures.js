Meteor.startup(function() {
    if ( URLs.find().count() === 0 ) {
        var links = ["http://manuel-schoebel.com/blog/meteorjs-the-perfect-match-for-lean-startups",
            "https://www.meteor.com/blog/2013/12/13/why-web-beginners-should-start-with-meteor",
            "http://javascriptissexy.com/how-to-learn-javascript-properly/",
            "http://stackoverflow.com/questions/9596276/how-to-explain-callbacks-in-plain-english-how-are-they-different-from-calling-o",
            "http://addyosmani.com/resources/essentialjsdesignpatterns/book/",
            "https://groups.google.com/forum/?fromgroups#!forum/meteor-talk",
            "https://hackpad.com/Top-Resources-for-learning-MeteorJS-Nrpnr6CHiGs",
            "http://www.andrewmunsell.com/blog/introduction-to-realtime-web-meteor-and-nodejs/",
            "http://sebastiandahlgren.se/2013/07/17/tutorial-writing-your-first-metor-application/",
            "http://blog.appliedis.com/2014/05/15/meteorjs-making-single-page-applications-that-are-fun-to-build/",
            "https://waaave.com/tutorial/meteor/design-a-complete-authentication-system-with-meteor/",
            "https://tutsplus.com/course/building-single-page-web-application-with-meteor-js/",
            "https://www.youtube.com/watch?v=LPIgeRkyOFs&list=PLWOwgptSFZ6SyW3D4KsuAbDrTWWz0Hqa2",
            "http://blog.benmcmahen.com/post/41741539120/building-a-customized-accounts-ui-for-meteor",
            "http://www.keysolutions.com/blogs/kenyee.nsf/d6plinks/KKYE-94VUVQ",
            "http://manuel-schoebel.com/blog/meteorjs-iron-router-filters-before-and-after-hooks",
            "http://robertdickert.com/blog/2013/11/14/why-is-my-meteor-app-not-updating-reactively/",
            "http://pasdechocolat.com/2013/07/20/livebus-with-meteor-and-d3/",
            "https://www.youtube.com/playlist?list=PLT6qiYgD0zz2JWuMkbsOiuvM2plDn536r",
            "http://journal.gentlenode.com/meteor-9-internationalization-i18n/"
        ];
        
        var newShortURLs = [];
        
        _.each(links, function(link) {
            do {
                var newShortURL = Random.id().substring(0,5);
            } while ( _.contains(newShortURLs, newShortURL) );
            
            var date = new Date();
            
            URLs.insert({
                targetURL: link
                , shortURL: newShortURL
                , isPrivate: false
                , userId: null
                , timeCreated: date
                , timeModified: date // for better sorting order
                , visitCount: 0
            });
        });
    }
});
