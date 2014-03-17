var passport    = require('passport'),
    GithubStrategy = require('passport-github').Strategy,
    User = require('../models/user');

module.exports = function(app, passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user)
        });
    });

    passport.use(new GithubStrategy(require('./github')(app), function(accessToken, refreshToken, profile, done) {
        User.findOne({username: profile.username}, function(err, user) {
            if (user) {
                user.token = accessToken;
                user.save(function(err) {
                    if (err) throw err;
                    return done(null, user);
                });
            } else {
                var newUser = new User({
                    displayName: profile.displayName,
                    username: profile.username,
                    token: accessToken
                });

                if(profile.emails && profile.emails[0] && profile.emails[0].value) {
                    newUser.email = profile.emails[0].value;
                }

                newUser.save(function(err) {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }
        });
    }));
}
