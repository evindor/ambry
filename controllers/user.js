var async = require('async'),
    io = require('socket.io'),    
    User = require('../models/user'),
    Tag = require('../models/tag'),
    Star = require('../models/star');

module.exports = {
    show: function(req, res, username) {
        if (!req.username) return res.render('404');

        //if (req.isAuthenticated()) bindSockets(req, res);
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
    }
}

bindSockets = function(req, res) {
    io.sockets.on('connection', function(socket) {
        req.user.updateStars(function(err, user, stars) {
            socket.emit('user', JSON.stringify(user))
            socket.emit('stars', JSON.stringify(stars))
        });
    });
}
