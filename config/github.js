var conf = {
    dev: {
        clientID: '5ec27229c6d055864ec8',
        clientSecret: 'b8a4015395ef4887b32e3e6d8269af6e13b4f2bf',
        callbackURL: 'http://ambry.dev.pw:3000/auth/github/callback'
    },
    prod: {
        clientID: '65b184ffe29109d564b6',
        clientSecret: 'c5e4c4c4c9538d4c089185d35a97fc913877a5d8',
        callbackURL: 'http://ambry.pw/auth/github/callback'
    }
};

module.exports = function(app) {
    if ('development' == app.get('env')) {
        return conf.dev
    }
    return conf.prod;
};
