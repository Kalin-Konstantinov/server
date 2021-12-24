const { isAuthenticated } = require('../middlewares/authMiddlewares');
const { createRecipe } = require('../services/recipeService');

const router = require('express').Router();

const postRecipe = (req, res) => {
    const ownerId = req.user._id;
    const { title, description, products, imageUrl, category } = req.body;

    createRecipe({ title, description, products, imageUrl, category, ownerId })
        .then(response => {
            res.json({ response });
        })
        .catch(err => res.json(err))
}


router.post('/', isAuthenticated, postRecipe);

module.exports = router;



