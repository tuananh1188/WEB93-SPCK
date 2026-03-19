import ProductModel from '../models/product.model.js';

export const validateCartItem = async (req, res, next) => {
    try {
        const { productId, quantity, size } = req.body;
        const product = await ProductModel.findById(productId);
        if (!product || product.isDeleted) {
            return res.status(404).send({
                message: 'Product does not exist or is Deleted ! '
            });
        }
        const isSizeValid = product.attributes.size.some(
            (s) => s.name === size
        );
        if (!isSizeValid) {
            return res.status(400).send({
                message: `'Size ${size} invalid !`
            });
        }
        if (product.stock < quantity) {
            return res.status(400).send({
                message: ` Only ${product.stock} product left in stock ! `
            });
        }
        req.productData = product;
        next();
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
