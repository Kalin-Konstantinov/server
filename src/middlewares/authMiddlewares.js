
const { JWT_SECRET } = require('../constants');
const jwt = require('../helpers/jwt');

exports.isAuth = (req, res, next) => {
    const token = req.header['x-autorization'];
    if (token) {
        jwt.verify(token, JWT_SECRET)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => {
                res.json({ err: "invalid token"})
            })
    } else {
        req.user = undefined;
        next();
    }
}