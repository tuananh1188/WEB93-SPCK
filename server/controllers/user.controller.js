import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const userRegister = async (req, res) => {
    try {
        const { email, password, name, phone, address, role } = req.body;
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
            phone,
            address,
            role,
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
        //Tao Access Token
        const accessToken = jwt.sign(
            { id: existedUser._id, role: existedUser.role },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '15m' }
        );
        //Tạo Refresh Token
        const refreshToken = jwt.sign(
            { id: existedUser._id, role: existedUser.role },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '7d' }
        );
        //Lưu Refresh Token vào database
        existedUser.refreshToken = refreshToken;
        await existedUser.save();
        //Cài đặt Cookie ở đây
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // Quan trong : Ngan chan JavaScript truy cap ( chong XSS)
            secure: false, // De false neu chay localhost, true neu dung HTTPS
            sameSite: 'strict', //Chong CSRF
            path: '/', // Co hieu luc cho toan bo domain
            maxAge: 7 * 24 * 60 * 60 * 1000 // Khop voi expriresIn cua JWT ( 7 ngay)
        });
        const { password: _, ...userWithoutPassword } = existedUser.toObject();
        res.status(200).send({
            message: 'Login is successfully !',
            accessToken: accessToken,
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).send({
                message: 'You are not authenticated !'
            });
        }
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_KEY,
            async (err, decoded) => {
                if (err)
                    return res
                        .status(403)
                        .send({ message: 'Token is not valid !' });
                //Kiem tra token trong DB ( dam bao user chua logout)
                const user = await UserModel.findById(decoded.id);
                if (!user || user.refreshToken !== refreshToken) {
                    return res.status(403).send({
                        message: 'Token invalid or revoked !'
                    });
                }
                //Tao Access Token moi
                const newAccessToken = jwt.sign(
                    { id: user._id, role: user.role },
                    process.env.JWT_ACCESS_KEY,
                    { expiresIn: '15m' }
                );
                res.status(200).send({
                    accessToken: newAccessToken
                });
            }
        );
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getInfo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .send({ message: 'Invalid User ID format! !' });
        }
        const user = await UserModel.findById(id).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'User not found !' });
        }
        res.status(200).send({
            message: 'Get user info successfully!',
            data: user
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
