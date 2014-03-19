var User = require('../models/user'),
    Tag = require('../models/tag');

module.exports = {
    show: function(req, res, username) {
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
    }
}
