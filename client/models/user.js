var Backbone = require('backbone'),
    Stars = require('../collections/stars');

module.exports = Backbone.Model.extend({
    constructor: function() {
        var args = Array.prototype.slice.call(arguments),
            attrs = args[0],
            opts = args[1];

        this.stars = new Stars(attrs.stars);
        delete attrs.stars;

        Backbone.Model.apply(this, args);
    }
});

