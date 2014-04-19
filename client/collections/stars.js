var Backbone = require('backbone'),
    Star = require('../models/star');

module.exports = Backbone.Collection.extend({
    model: Star,
    url: '/stars/update',
    update: function() {
        this.fetch({reset: true});
    },
    comparator: function(star) {
        return star.get('name').toLowerCase();
    }
});
