import mongoose, { Schema } from 'mongoose'

// SCHEMA, TYPED
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    emailVerified:  {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'user'
    },
    bio: {
        type: String,
        default: "I love the Esoteric Order of Dagon and i do recommend this website to everyone i know, even if it's a topic out of context from what we are talking about."
    },
    location: {
        type: String,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        default: []
    }]
})

// CLASS, it utilize our shcema
const User = mongoose.model('User', userSchema)

export default User