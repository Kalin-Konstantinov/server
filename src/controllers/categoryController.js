const { createCategory } = require('../services/categoryService');

const router = require('express').Router();


const postCategory = (req, res) => {
    const { name, imageUrl} = req.body;
    const data = {name, imageUrl};
    createCategory(data)
        .then(response => {
            res.json(response);
        })
        .catch(err => res.json(err));
}

const getAllCategorys = (req, res) => {

}


router.post('/', postCategory);
router.get('/', getAllCategorys);

module.exports = router;
