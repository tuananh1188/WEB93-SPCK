export const validateProductData = (req, res, next) => {
    try {
        const { name, category, price, stock } = req.body;
        if (!name || !category || !price || stock === undefined) {
            return res.status(400).send({
                message: 'All field are required !'
            });
        }

        if (price <= 0 || stock < 0) {
            return res.status(400).send({
                message: 'Price and stock invalid !'
            });
        }
        next();
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
