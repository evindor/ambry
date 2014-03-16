var mongoose = require('mongoose'),
    request = require('request');/*,
    Star = require('./star');*/

var userSchema = mongoose.Schema({
    token        : String,
    email        : String,
    displayName  : String,
    username     : String,
    stars        : Array//[{type: mongoose.Schema.Types.ObjectId, ref: 'Star'}]
});


userSchema.methods.updateStars = function(cb) {
    var user = this;
    request.get({
            url: 'https://api.github.com/user/starred?access_token=' + this.token,
            headers: {
                'User-Agent': 'Express'
            }
        },
        function(err, res, body) {
            if (err) throw err;
            var stars = JSON.parse(body);
            stars.forEach(function(star) {
                //star._userId = user._id
                //var star = new Star(star);
                //star.save(function(err) {
                    //if (err) throw err;
                //});
                user.stars.push(star);
            })
            user.save(function(err) { 
                if (err) throw err;
                cb(user);
            });
        }
    );
}
module.exports = mongoose.model('User', userSchema);
