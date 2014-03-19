var Backbone = require('backbone'),
    $ = require('jquery'),
    User = require('../models/user'),
    Stars = require('../collections/stars'),
    Tags = require('../collections/tags'),
    rivets = require('rivets'),
    template = require('../templates/app.jade');

require('../vendor/rivets.adapter');

module.exports = Backbone.View.extend({
    el: '#app',

    initialize: function(options) {
        this.user = new User(options.user);
        this.stars = new Stars(options.stars);
        this.tags = new Tags(options.tags);
        this.render();
    },

    events: {
        'submit .add-tag': 'addTag',
        'dragover .tag-item': 'cancelEvent',
        'dragenter .tag-item': 'cancelEvent',
        'dragstart .star-item': 'handleStarDrag',
        'drop .tag-item': 'handleStarDrop'
    },

    render: function() {
        this.$el.html(template({
            user: this.user,
            stars: this.stars,
            tags: this.tags
        }));
        rivets.bind(this.$el[0], {
            user: this.user,
            stars: this.stars,
            tags: this.tags
        });
    },

    addTag: function(event) {
        event.preventDefault();
        var tagName = $(event.target).find('input').val();
        this.tags.create({name: tagName});
    },

    cancelEvent: function(event) {
        event.preventDefault();
        return false;
    },
    
    handleStarDrag: function(event) {
        var id = $(event.target).attr('data-id');
        event.dataTransfer.setData('id', id);
    },

    handleStarDrop: function(event) {
        event.preventDefault();
        var starId = event.dataTransfer.getData('id'),
            tagId = $(event.target).attr('data-id');

        var tags = this.user.stars.findWhere({_id: starId}).get('tags');
        tags.push(starId);
        this.user.stars.save()
    }
});
