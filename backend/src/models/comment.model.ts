import mongoose from 'mongoose'

const ResponseSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    comments: {
        type: [ResponseSchema],
        default: []
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment