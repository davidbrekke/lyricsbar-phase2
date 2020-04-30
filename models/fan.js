const mongoose = require('mongoose');

const fanSchema = new mongoose.Schema({
    artist: {
        type: String, // authors username, since usernames must be unique
        required: true
    },
    fan: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Fan', fanSchema);