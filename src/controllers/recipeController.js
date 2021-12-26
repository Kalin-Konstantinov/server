const { isAuthenticated } = require('../middlewares/authMiddlewares');
const { createRecipe, findRecipesByCategory, findOneRecipeById, findRecipeAndUpdate, findRecipeAndDeleteIt } = require('../services/recipeService');

const router = require('express').Router();

const postRecipe = (req, res) => {
    const ownerId = req.user._id;
    let { title, description, products, imageUrl, category } = req.body;
    category = category.toLowerCase();

    createRecipe({ title, description, products, imageUrl, category, ownerId })
        .then(response => {
            res.json({ response });
        })
        .catch(err => res.json(err))
}

const getAllRcipes = (req, res) => {
    findAllRecipes()
        .then(recipes => {
            res.json({ recipes });
        })
}

const getRecipesByCategory = (req, res) => {
    const categoryName = req.params.categoryName;

    findRecipesByCategory(categoryName)
        .then(recipes => res.json(recipes))
}

const getOneRecipeById = (req, res) => {
    const recipeId = req.params.recipeId;
    findOneRecipeById(recipeId)
        .then(recipe => res.json(recipe))
}

const updateOneRecipe = (req, res) => {
    const recipeId = req.params.recipeId;
    const recipeData = req.body;
    findRecipeAndUpdate(recipeId, recipeData)
        .then(recipe => {
            res.json(recipe);
        })
        .catch(err => res.json(err))
}

const deleteRecipe = (req, res) => {
    const recipeId = req.params.recipeId;
    findRecipeAndDeleteIt(recipeId)
        .then(() => res.json({ ok: true }))
}


router.post('/', isAuthenticated, postRecipe);
router.get('/', getAllRcipes);
router.get('/one/:recipeId', getOneRecipeById);
router.delete('/one/:recipeId', deleteRecipe);
router.put('/one/:recipeId', updateOneRecipe);
router.get('/:categoryName', getRecipesByCategory);

module.exports = router;



