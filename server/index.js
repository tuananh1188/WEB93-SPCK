import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';
import ProductRouter from './routes/product.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import CartRouter from './routes/cart.routes.js';

//1.Cau hinh moi truong
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL || '';

//2.Middleware co ban
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);
app.use(express.json());
app.use(cookieParser())

await mongoose.connect(databaseUrl);

app.get('', (req, res) => {
    res.send({
        message: 'Welcome to Website Ecommerce'
    });
});

app.use('/users', UserRouter);
app.use('/products', ProductRouter);
app.use('/carts',CartRouter);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
