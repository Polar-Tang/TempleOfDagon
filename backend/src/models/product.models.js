import mongoose from 'mongoose'

// SCHEMA, TYPED
const productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock:  {
        type: Number,
        required: true,
    },
    description:  {
        type: String,
    },
    category: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    image_url: {
        type: String,
    },
    seller_name: {
        type: String,
        ref: 'User',
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
    }
},{
    timestamps: true
})

// CLASS, it utilize our shcema
const Product = mongoose.model('Product', productSchema)

export default Product