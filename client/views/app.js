var Backbone = require('backbone'),
    User = require('../models/user'),
    Stars = require('../collections/stars'),
    template = require('../templates/app.jade');

module.exports = Backbone.View.extend({
    el: '#app',

    initialize: function(options) {
        this.user = new User(options.user);
        this.render();
    },

    render: function() {
        this.$el.html(template({
            user: this.user
        }));
    }
});
