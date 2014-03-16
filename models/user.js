var mongoose = require('mongoose'),
    request = require('request'),
    Star = require('./star');

var userSchema = mongoose.Schema({
    token: String,
    email: String,
    displayName: String,
    username: {type: [String], index: true},
    stars: [{type: mongoose.Schema.Types.ObjectId, ref: 'Star', unique: true}]
});

userSchema.methods.updateStars = function(cb) {
    var user = this,
        userId = mongoose.Schema.Types.ObjectId(user);
    request.get({
            url: 'https://api.github.com/user/starred?access_token=' + this.token,
            headers: {
                'User-Agent': 'Express'
            }
        },
        function(err, res, body) {
            if (err) throw err;
            var stars = JSON.parse(body),
                count = 0,
                saveUser = function() {
                    if (count == stars.length) {
                        user.save(function(err) { 
                            if (err) throw err;
                            user.populate('stars', function(err, user) {
                                if (err) throw err;
                                cb(user);
                            });
                        });
                    }
                };
            stars.forEach(function(star) {
                Star.findOne({name: star.name}, function(err, found) {
                    if (!found) {
                        Star.create(star, function(err, newStar) {
                            user.stars.push(newStar._id);
                            count += 1;
                            saveUser();
                        });
                    } else {
                        count += 1;
                        saveUser();
                    }
                });
            });
        }
    );
}

userSchema.set('autoIndex', false);

module.exports = mongoose.model('User', userSchema);
