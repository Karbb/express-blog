var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = Schema({
    title: {type : String, required: true},
    content: {type: String, required: true},
    date: {type: Date},
    author: {type: String}
});

PostSchema.virtual('url').get(function() {
    return '/post/' + this._id;
});

PostSchema.virtual('content_short').get(function() {
    return content.substring(0, 100);
});

//export model
module.exports = mongoose.model('Post', PostSchema);