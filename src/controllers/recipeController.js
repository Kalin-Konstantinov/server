const { isAuthenticated } = require('../middlewares/authMiddlewares');
const { createRecipe, getAll } = require('../services/recipeService');

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

const getAllRcipes = (req, res) => {
    getAll()
        .then(recipes => {
            res.json({ recipes });
        })
}


router.post('/', isAuthenticated, postRecipe);
router.get('/', getAllRcipes);

module.exports = router;



