import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
    avatar: {type: String, default: ''},
    addresses: [
        {
            street: String,
            city: String,
            isDefault: {
                type: Boolean,
                default: false
            }
            
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
