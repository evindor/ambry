var Backbone = require('backbone'),
    $ = require('jquery'),
    AppView = require('./views/app');
Backbone.$ = $;

$(function() {
    window.app = new AppView({user: window.bootstrappedUser || null})
});
