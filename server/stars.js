Meteor.publish('stars', function() {
    return Stars.find();
});
