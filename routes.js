var User = require('./models/user'),
    Tag = require('./models/tag');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        if (req.user) return res.redirect('/' + req.user.username);
        res.render('index');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', function(req, res, next) {
        passport.authenticate( 'github', function(err, user, info) {
            if (err) return next(err);
            if (!user) return res.redirect('/');
            req.logIn(user, function(err) {
                if (err) return next(err);
                return res.redirect('/' + user.username);
            });
        })(req, res, next);
    });

    app.get('/tags', function(req, res) {
        if (req.isAuthenticated()) {
            Tag.find({_ownerId: req.user._id}, function(err, tags) {
                res.json(tags);
            }); 
        } else {
            res.send(401); 
        }
    });

    app.post('/tags', function(req, res) {
        if (req.isAuthenticated()) {
            Tag.findOne({_ownerId: req.user._id, name: req.body.name}, function(err, tags) {
                if (tags) return res.send(400);
                Tag.create({_ownerId: req.user._id, name: req.body.name}, function(err, tag) {
                    res.json(tag);
                });
            }); 
        } else {
            res.send(401); 
        }
    });

    app.get('/:username', function(req, res, username) {
        if (!req.username) {
            return res.render('404');
        }

        if (req.isAuthenticated() && req.username.id === req.user.id) {
            Tag.find({_ownerId: req.user._id}, function(err, tags) {
                if (req.user.stars.length) {
                    req.user.populate('stars', function(err, userPopulated) {
                        if (err) throw err;
                        res.render('app', {
                            user : userPopulated,
                            tags: tags
                        });
                    });
                } else {
                    req.user.updateStars(function(user) {
                        res.render('app', {
                            user : user,
                            tags: tags
                        });
                    });
                }
            });
        } else {
            req.username.populate('stars', function(err, user) {
                if (err) throw err;
                res.render('profile', {
                    user : user
                });
            });
        }
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
