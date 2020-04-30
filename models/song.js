const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        default: 'public'
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    lyrics: {
        type: String
    },
    genre: {
        type: String
    },
    album_art: {
        type: String
    },
    lyrics: {
        type: String
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

songSchema.index({ title: 'text', artist: 'text', album: 'text', lyrics: 'text' });
module.exports = mongoose.model('Song', songSchema);