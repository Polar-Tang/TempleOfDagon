import mongoose from 'mongoose'

const ChallengeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    solved: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }
});

const Challenge = mongoose.model('Cart', ChallengeSchema)

export default Challenge