import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';

dotenv.config();
const databaseUrl = process.env.DATABASE_URL || '';
await mongoose.connect(databaseUrl);
const app = express();
app.use(express.json());

export const secretKey = process.env.JWT_SECRET || '';

app.get('', (req, res) => {
    res.send({
        message: 'Website Ecommerce'
    });
});

app.use('/users', UserRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
