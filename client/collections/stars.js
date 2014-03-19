var Backbone = require('backbone'),
    Star = require('../models/star');

module.exports = Backbone.Collection.extend({
    model: Star,
    url: '/stars'
});
