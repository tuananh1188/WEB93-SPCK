export const userRegisterMiddleware = (req, res, next) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name) {
            return res.status(400).send({
                message: 'name is required !'
            });
        }
        if (!email) {
            return res.status(400).send({
                message: 'email is required !'
            });
        }
        if (!password) {
            return res.status(400).send({
                message: 'password is required !'
            });
        }
        if (!phone) {
            return res.status(400).send({
                message: 'phone is required !'
            });
        }
        if (!address) {
            return res.status(400).send({
                message: 'address is required !'
            });
        }
        next();
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

export const userLoginMiddleware = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).send({
                message: 'Email is required !'
            });
        }
        if (!password) {
            return res.status(400).send({
                message: 'Password is required !'
            });
        }
        next();
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
