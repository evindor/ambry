var mongoose = require('mongoose'),
    request = require('request'),
    linkParser = require('parse-link-header'),
    Star = require('./star');

var userSchema = mongoose.Schema({
    token: String,
    email: String,
    displayName: String,
    username: {type: String, index: true},
    stars: [{type: mongoose.Schema.Types.ObjectId, ref: 'Star', unique: true}]
});

function starredRequest(options, cb) {
    if (!options.accessToken) throw Error('need access token');
    var link = 'https://api.github.com/user/starred?';
    link += 'access_token=' + options.accessToken;
    if (options.page) link += '&page=' + options.page;
    if (options.per_page) link += '&per_page=' + options.per_page;
    request.get({url: link, headers: {'User-Agent': 'Express'}},
        function(err, res, body) {
            var stars = JSON.parse(body),
                headers = res.headers;
            cb(err, stars, headers);
        }
    );
}

function fetchStars(user, cb) {
    var allStars = [],
        token = user.token;

    var callback = function(err, stars, headers) {
        if (err) throw err;
        var links;
        allStars = allStars.concat(stars);
        if (headers.link) {
            links = linkParser(headers.link);
            if (links.next) {
                starredRequest({accessToken: token, page: links.next.page, per_page: 100}, callback);
            } else {
                cb(allStars);
            }
        } else {
            cb(allStars); 
        }
    }

    starredRequest({accessToken: token, page: 1, per_page: 100}, callback);
}

userSchema.methods.updateStars = function(cb) {
    var user = this,
        userId = mongoose.Schema.Types.ObjectId(user);

    fetchStars(user, function(stars) {
        var count = 0,
            saveUser = function() {
                if (count == stars.length) {
                    user.save(function(err, user) { 
                        if (err) throw err;
                        user.populate('stars', function(err, user) {
                            if (err) throw err;
                            cb(user);
                        });
                    });
                }
            };

        stars.forEach(function(star) {
            Star.findOne({_ownerId: user._id, name: star.name}, function(err, found) {
                if (!found) {
                    var data = star;
                    data._ownerId = user._id;
                    Star.create(data, function(err, newStar) {
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
    });
};

userSchema.set('autoIndex', false);

module.exports = mongoose.model('User', userSchema);
