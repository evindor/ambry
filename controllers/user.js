var async = require('async'),
    User = require('../models/user'),
    Tag = require('../models/tag'),
    Star = require('../models/star');

module.exports = {
    show: function(req, res, username) {
        if (!req.username) return res.render('404');

        // TODO: fetch stars for newcomers
        var view = req.isAuthenticated() ? 'app' : 'profile';
        async.parallel({
            tags: function(cb) { Tag.find({_ownerId: req.username._id}, cb) },
            stars: function(cb) { Star.find({_ownerId: req.username._id}, cb) }
        },
        function(err, models) {
            if (err) throw err;
            res.render(view, {
                user : req.username,
                tags: models.tags,
                stars: models.stars
            });
        });
    },

    updateStars: function(req, res) {
        if (!req.isAuthenticated()) return res.render('403');
        req.user.updateStars(function(stars) {
            res.json(200, stars);
        });
    }
}
