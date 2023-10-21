import mongoose from 'mongoose';

const catalogSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        }
    }]
}, { timestamps: true });

const Catalog = mongoose.model('Catalog', catalogSchema);

export default Catalog;