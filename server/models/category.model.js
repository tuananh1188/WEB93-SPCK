import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        default: null
    },
    description: String
});

const CategoryModel = mongoose.model('categories', categorySchema);
export default CategoryModel;
