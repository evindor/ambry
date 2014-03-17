var Backbone = require('backbone'),
    User = require('../models/user'),
    Stars = require('../collections/stars');

module.exports = Backbone.View.extend({
    initialize: function(options) {
        this.user = new User(options.user);
        this.render();
    },

    render: function() {
        //render
    }
});
