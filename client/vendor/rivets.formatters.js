var rivets = require('rivets'),
    _ = require('underscore');

rivets.formatters.filter = function(collection, field, has) {
    return _.filter(collection, function(model) {
        var f = model.get(field);
        return has === 'no' ? !f : f;
    });
}

module.exports = rivets;
