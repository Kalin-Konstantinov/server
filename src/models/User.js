const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const { ROUNDS_HASH_PASSWORD } = require('../constants')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Name must be at least 3 characters.'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Password must be at leasr 5 characters.']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Already have user with this email.'],
    }
})

userSchema.pre('save', async function () {
    let res = await bcrypt.hash(this.password, ROUNDS_HASH_PASSWORD);
    this.password = res;
})

const User = mongoose.model('User', userSchema);

module.exports = User;