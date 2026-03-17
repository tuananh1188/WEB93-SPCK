import { Router } from 'express';
import {
    userLoginMiddleware,
    userRegisterMiddleware,
} from '../middlewares/user.middleware.js';
import { refreshToken, userLogin, userRegister } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../middlewares/auth.middleware.js';

const UserRouter = Router();

UserRouter.post('/register', userRegisterMiddleware, userRegister);
UserRouter.post('/login', userLoginMiddleware, userLogin);
UserRouter.get('/profile', verifyToken, (req,res)=>{
    res.status(200).send(req.user)
});
UserRouter.get('/admin', verifyToken, isAdmin, (req,res)=>{
    res.status(200).json({message: "Welcome to Admin "})
});
UserRouter.post('/refresh-token',refreshToken);

export default UserRouter;
