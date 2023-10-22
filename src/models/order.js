import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    seller: {
        type: String,
        ref: 'User',
        required: true
    },
    buyer: {
        type: String,
        ref: 'User',
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;