const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const { ROUNDS_HASH_PASSOWRD } = require('../constants')

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

userSchema.pre('save', async function () {
    let res = await bcrypt.hash(this.password, ROUNDS_HASH_PASSOWRD);
    this.password = res;
})

const User = mongoose.model('User', userSchema);

module.exports = User;