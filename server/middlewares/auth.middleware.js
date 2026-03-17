import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
export const verifyToken = async (req, res, next) => {
    try {
        //1 Lay token tu header "Authorizatio" (thuong co dang Bearer <token>)
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(401).send({
                message: 'You are not login ! Token please !'
            });
        }
        //2 Xac thuc token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
        //3 Tim user tu database (de dam bao user van ton tai hoac chua bi xoa)
        const user = await UserModel.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).send({
                message: 'User is not exsited or deleted !'
            });
        }
        //4 Gan thong tin user vao object 'req de cac ham sau co the su dung
        req.user = user;
        next();
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).send({
            message: 'Access is denied ! You are not admin !'
        });
    }
};
