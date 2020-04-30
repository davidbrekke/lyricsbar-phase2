const mongoose = require('mongoose');

// mongoose.schema takes in an object
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: 'basic'
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
userSchema.index({ username: 'text' });
module.exports = mongoose.model('User', userSchema);