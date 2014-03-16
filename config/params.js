var User = require('../models/user');

module.exports = function(app) {
    app.param('username', function(req, res, next, username) {
        User.findOne({username: username}, function(err, username) {
            if (err) {
                return next(err);
            }
            req.username = username;
            next();
        });
    });  
};
