import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                name: String,
                price: Number,
                quantity: {
                    type: Number,
                    required: true
                },
                image: String
            }
        ],
        totalAmount: { type: Number, required: true },
        shippingAddress: {
            street: String,
            city: String
        },
        paymentMethod: {
            type: String,
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['unpaid', 'paid'],
            default: 'unpaid'
        },
        status: {
            type: String,
            enum: [
                'Pending',
                'Processing',
                'Shipped',
                'Delivered',
                'Cancelled'
            ],
            default: 'Pending'
        }
    },
    { timestamps: true }
);

const OrderModel = mongoose.model('orders', orderSchema);
export default OrderModel;
