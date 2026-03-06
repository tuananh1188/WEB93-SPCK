import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        salePrice: { type: Number },
        stock: {
            type: Number,
            required: true,
            min: 0
        },
        images: [String],
        description: {
            type: String,
            index: true
        },
        attributes: {
            type: Map,
            of: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        ratings: {
            average: {
                type: Number,
                default: 0
            },
            count: {
                type: Number,
                default: 0
            }
        }
    },
    { timestamps: true }
);
//compound index thuong dung, dang su dung ky thuat b-tree index
productSchema.index({ slug: 1 });
productSchema.index({ name: 'text', description: 'text' });
const ProductModel = mongoose.model('products', productSchema);
export default ProductModel;
