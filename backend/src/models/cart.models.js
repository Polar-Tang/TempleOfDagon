import mongoose from 'mongoose'

const DetailProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    }
});

const CartSchema = new mongoose.Schema({
    cartId: {
        type: String,
        required: true
    },
    detailProducts: {
        type: [DetailProductSchema],
        required: true,
    },
},{
    timestamps: true
})

// CLASS, it utilize our shcema
const CartProduct = mongoose.model('Cart', CartSchema)

export default CartProduct