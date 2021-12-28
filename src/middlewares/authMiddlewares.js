
const { JWT_SECRET } = require('../constants');
const jwt = require('../helpers/jwt');
const { findOneRecipeById } = require('../services/recipeService');

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

exports.isAuthor = (req, res, next) => {
    const userId = req.user._id;
    const email = req.user.email;
    const recipeId = req.params.recipeId;
    findOneRecipeById(recipeId)
    .then(currRecipe => {
            if (userId != undefined && (currRecipe.ownerId._id == userId || email === 'admin@admin')) {
                return next();
            } else {
                res.json({err: 403, message: 'Access to the requested resource is forbidden!'})
            }

        })
}