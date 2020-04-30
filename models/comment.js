const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: String, // authors username, since usernames must be unique
        required: true
    },
    content: {
        type: String,
        required: true
    },
    songID: {
        type: String, // id of song the comment is on
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);