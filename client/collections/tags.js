var Backbone = require('backbone'),
    Tag = require('../models/tag');

module.exports = Backbone.Collection.extend({
    model: Tag,
    url: '/tags'
});

