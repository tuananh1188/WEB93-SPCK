export const userRegisterMiddleware = (req, res, next) => {
    try {
        const { email, password } = req.body;
       
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
