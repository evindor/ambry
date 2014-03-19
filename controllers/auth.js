module.exports = {
    githubCallback: function(passport) {
        return function(req, res, next) {
            passport.authenticate( 'github', function(err, user, info) {
                if (err) return next(err);
                if (!user) return res.redirect('/');
                req.logIn(user, function(err) {
                    if (err) return next(err);
                    return res.redirect('/' + user.username);
                });
            })(req, res, next);
        }
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
}
