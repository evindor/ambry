var Backbone = require('backbone'),
    $ = require('jquery'),
    User = require('../models/user'),
    Stars = require('../collections/stars'),
    Tags = require('../collections/tags'),
    rivets = require('rivets'),
    template = require('../templates/app.jade');

require('../vendor/rivets.adapter');
require('../vendor/rivets.formatters');

module.exports = Backbone.View.extend({
    el: '#app',

    initialize: function(options) {
        this.user = new User(options.user);
        this.stars = new Stars(options.stars);
        this.tags = new Tags(options.tags);
        this.render();
        this.stars.update();
    },

    events: {
        'submit .add-tag': 'addTag',
        'keyup .search-tags': 'searchTags',
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
        var id = $(event.target).closest('.star-item').attr('data-id');
        event.originalEvent.dataTransfer.setData('id', id);
    },

    handleStarDrop: function(event) {
        event.preventDefault();
        var starId = event.originalEvent.dataTransfer.getData('id'),
            tagId = $(event.target).closest('.tag-item').attr('data-id');

        var star = this.stars.findWhere({_id: starId});
        var tag = this.tags.findWhere({_id: tagId});
        tag.get('stars').push(starId);
        star.get('tags').push(tagId);
        star.save();
        tag.save();
    },

    searchTags: function(event) {
        var query = $(event);
    }
});
