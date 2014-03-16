var mongoose = require('mongoose');

var starSchema = mongoose.Schema({
    name: String,
    language: String,
    _ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('Star', starSchema);
