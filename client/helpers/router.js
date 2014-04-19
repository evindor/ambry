Meteor.Router.add({
    '/': function() {
        if (Meteor.user()) {
            return 'user';
        } else {
            return 'login';
        }
    }
});
