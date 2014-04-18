var Star = require('../models/star');

module.exports = {
    update: function(req, res, id) {
        if (req.isAuthenticated()) {
            Star.findOne({_id: req.params.id}, function(err, star) {
                if (!star) return res.send(402);
                star.update({$pushAll: {tags: req.body.tags}}, function(err, star) {
                    res.json(star);
                });
            }); 
        } else {
            res.send(401); 
        }
    }
}
