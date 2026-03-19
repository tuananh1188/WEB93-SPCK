import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            unique: true,
            required: true
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1,
                    min: [1]
                },
                size: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number
                }
            }
        ],
        totalPrice: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

const CartModel = mongoose.model('carts', cartSchema);
export default CartModel;
