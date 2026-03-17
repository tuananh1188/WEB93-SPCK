import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer'
        },
        address: { type: String, required: true }
    },
    { timestamps: true }
);

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
