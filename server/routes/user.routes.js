import { Router } from 'express';
import {
    userLoginMiddleware,
    userRegisterMiddleware,
} from '../middlewares/user.middleware.js';
import { userLogin, userRegister } from '../controllers/user.controller.js';
import { isAdmin, verifyToken } from '../middlewares/auth.middleware.js';

const UserRouter = Router();

UserRouter.post('/register', userRegisterMiddleware, userRegister);
UserRouter.post('/api/login', userLoginMiddleware, userLogin);
UserRouter.get('/profile', verifyToken, ()=>{});
UserRouter.get('/admin/dashboard', verifyToken, isAdmin, ()=>{})

export default UserRouter;
