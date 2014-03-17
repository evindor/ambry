var mongoose = require('mongoose');

var starSchema = mongoose.Schema({
    name: String,
    language: String,
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    _ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('Star', starSchema);
