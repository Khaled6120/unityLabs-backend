const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
