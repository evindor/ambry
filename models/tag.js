var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
    name: String,
    _ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    stars: [{type: mongoose.Schema.Types.ObjectId, ref: 'Star'}]
});


module.exports = mongoose.model('Tag', tagSchema);

