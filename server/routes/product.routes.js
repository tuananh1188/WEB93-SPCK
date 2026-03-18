import { Router } from 'express';
import { validateProductData } from '../middlewares/product.middleware.js';
import { isAdmin, verifyToken } from '../middlewares/auth.middleware.js';
import {
    createProduct,
    getAllProducts
} from '../controllers/product.controller.js';
const ProductRouter = Router();
ProductRouter.get('/', getAllProducts);
ProductRouter.post(
    '/add',
    verifyToken,
    isAdmin,
    validateProductData,
    createProduct
);

export default ProductRouter;
