import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secretKey } from '../index.js';

export const userRegister = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existedUser = await UserModel.findOne({ email });
        if (existedUser) {
            return res.status(400).send({
                message: 'Email is already exist !'
            });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).send({
            message: 'Register is successfully !'
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existedUser = await UserModel.findOne({ email });
        if (!existedUser) {
            return res.status(400).send({
                message: 'Invalid email or password !'
            });
        }
        const isPasswordValid = bcrypt.compareSync(
            password,
            existedUser.password
        );
        if (!isPasswordValid) {
            return res.status(400).send({
                message: 'Invalid email or password !'
            });
        }
        const token = jwt.sign(
            { id: existedUser._id, role: existedUser.role },
            secretKey,
            { expiresIn: '1h' }
        );
        const { password: _, ...userWithoutPassword } = existedUser.toObject();
        res.status(200).send({
            message: 'Login is successfully !',
            token: token,
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
