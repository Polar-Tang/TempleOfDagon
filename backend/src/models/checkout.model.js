import mongoose from 'mongoose'

const CheckoutSchema = new mongoose.Schema({
    paymentTime: {
        type: Number,
        default: 0
    },
    cardholderName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryMonth: {
        type: String,
        required: true
    },
    expiryYear: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        required: true
    },
    total: {
        type: Number
    },
    active: {
        type: Boolean
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: []
    }]
},{
    timestamps: true
})

// CLASS, it utilize our shcema
const CheckoutSession = mongoose.model('Checkout', CheckoutSchema)

export default CheckoutSession