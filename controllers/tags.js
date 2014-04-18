var Tag = require('../models/tag');

module.exports = {
    index: function(req, res) {
        if (req.isAuthenticated()) {
            Tag.find({_ownerId: req.user._id}, function(err, tags) {
                res.json(tags);
            }); 
        } else {
            res.send(401); 
        }
    },

    create: function(req, res) {
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
    },

    update: function(req, res, id) {
        if (req.isAuthenticated()) {
            Tag.findOne({_id: req.params.id}, function(err, tag) {
                if (!tag) return res.send(401);
                tag.update({$pushAll: {stars: req.body.stars}}, function(err, tag) {
                    res.json(tag);
                });
            }); 
        } else {
            res.send(401); 
        }
    }

}
