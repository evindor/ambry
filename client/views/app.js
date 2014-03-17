var Backbone = require('backbone'),
    $ = require('jquery'),
    User = require('../models/user'),
    Stars = require('../collections/stars'),
    Tags = require('../collections/tags'),
    template = require('../templates/app.jade');

module.exports = Backbone.View.extend({
    el: '#app',

    initialize: function(options) {
        this.user = new User(options.user);
        this.tags = new Tags(options.tags);
        this.render();
    },

    events: {
        'submit .add-tag': 'addTag'
    },

    render: function() {
        this.$el.html(template({
            user: this.user,
            tags: this.tags
        }));
    },

    addTag: function(event) {
        event.preventDefault();
        var tagName = $(event.target).find('input').val();
        this.tags.create({name: tagName});
    }
});
