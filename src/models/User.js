const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, 'Already exist user with this name.'],
        minLength: [3, 'Name must be at least 3 characters.'],
        unique: true
    },
    password: {
        type: 'string',
        required: true,
        minLength: [5, 'Password must be at leasr 5 characters.']
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;