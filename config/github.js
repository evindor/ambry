var conf = {
    clientID: '65b184ffe29109d564b6',
    clientSecret: 'c5e4c4c4c9538d4c089185d35a97fc913877a5d8',
    callbackURL: 'http://ambry.pw/auth/github/callback'
};

module.exports = function(app) {
    if ('development' == app.get('env')) {
        conf.callbackURL = 'http://ambry.dev.pw:3000/auth/github/callback';
    }
    return conf;
};
