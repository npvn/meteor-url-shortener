Intro
==============

This is a hobby project I did to harden my Meteor skills and play around 
with <a href="https://github.com/npvn/meteor-material-design" target="_blank">Material Design</a>.

I hope this project will be a good reference for new Meteor learners. Suggestions for 
improvement (on code, structure, UI, UX and anything else) are very welcomed!

Features
==============

- URLs management: Registered users can manage their previously-created URLs and 
mark URLs as private.

- Secured pub/sub pattern to protect private URLs.

- Sever-side routing for faster URL redirection. If the requested URL is private,
the app will switch to client-side for user authentication.

- URL schema for data integrity  (using the awesome `aldeed:collection2` package).

- Real-time statistical tracking including number of visits by browser, OS and country.

- UI & UX inspired by the awesome <a href="https://github.com/npvn/meteor-material-design" target="_blank">Material Design</a> guideline from Google.

Todo
==============

- Make the svg charts responsive when viewport is resized.

- Allow users to protect URLs by password.

Install
==============

This repo contains a submodule at `/client/lib/meteor-material-design`

After cloning the repo, pull the submodule with the following command:

`git submodule update --init --recursive`

License
==============

MIT
