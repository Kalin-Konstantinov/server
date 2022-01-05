const { createCategory, findAllCaetgorys, findOneCaetgory } = require('../services/categoryService');
const { findRecipesByCategory } = require('../services/recipeService');

const router = require('express').Router();


const postCategory = (req, res) => {

    if (req.user.email !== 'admin@admin') {
        return req.json({ err: 403, message: 'Access to the requested resource is forbidden!' })
    }

    let { name, imageUrl } = req.body;
    name = name.toLowerCase();
    const data = { name, imageUrl };

    createCategory(data)
        .then(response => {
            res.json(response);
        })
        .catch(err => res.json(err));
}

const getAllCategorys = (req, res) => {
    findAllCaetgorys()
        .then(response => {
            res.json(response);
        })
}

const getRecipesByCategory = (req, res) => {
    const categoryName = req.params.categoryName;

    findRecipesByCategory(categoryName)
        .then(recipes => res.json(recipes))
}


router.post('/', postCategory);
router.get('/', getAllCategorys);
router.get('/:categoryName', getRecipesByCategory);

module.exports = router;
