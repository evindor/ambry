var User = require('./models/user'),
    Tag = require('./models/tag'),
    // Controllers
    index = require('./controllers/index'),
    auth = require('./controllers/auth'),
    tags = require('./controllers/tags'),
    stars = require('./controllers/stars'),
    user = require('./controllers/user');

module.exports = function(app, passport) {
    // Index
    app.get('/', index.index);

    // Auth
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', auth.githubCallback(passport));
    app.get('/logout', auth.logout);

    // Tags
    app.get('/tags', tags.index);
    app.post('/tags', tags.create);
    app.put('/tags/:id', tags.update);

    // User
    app.get('/:username', user.show);
    
    // Stars
    app.get('/stars/update', user.updateStars);
    app.put('/stars/update/:id', stars.update);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
