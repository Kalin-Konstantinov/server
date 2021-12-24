const mongoose = require('mongoose');

const recipesSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minLength: [3, 'The title shoud be at least 3 characters long']
    },
    products: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    imageUrl: {
        required: true,
        type: String,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})