import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';
import ProductRouter from './routes/product.routes.js';

//1.Cau hinh moi truong
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL || '';

//2.Middleware co ban
app.use(express.json());

await mongoose.connect(databaseUrl);

export const secretKey = process.env.JWT_SECRET || '';

app.get('', (req, res) => {
    res.send({
        message: 'Welcome to Website Ecommerce'
    });
});

app.use('/users', UserRouter);
app.use('/products', ProductRouter);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
