var User = require('./models/user');

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

    app.get('/:username', function(req, res, username) {
        if (!req.username) {
            return res.render('404');
        }

        if (req.isAuthenticated()) {
            req.user.updateStars(function(user) {
                res.render('profile', {
                    user : user
                });
            });
        } else {
            req.username.populate('stars', function(err, user) {
                if (err) throw err;
                res.render('profile', {
                    user : user
                });
            })
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
