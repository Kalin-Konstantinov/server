
const { JWT_SECRET } = require('../constants');
const jwt = require('../helpers/jwt');

exports.checkAndSetUser = (req, res, next) => {
    let token = req.headers['x-authorization'];
    if (token) {
        jwt.verify(token, JWT_SECRET)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(() => {
                res.json({ err: { message: "invalid token" } });
            })
    } else {
        req.user = undefined;
        next();
    }
}

exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.json({ err: { status: 401, message: "You must be logged in for this feature!", ok: false } })
    }
}