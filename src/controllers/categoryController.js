const { createCategory, findAllCaetgorys } = require('../services/categoryService');

const router = require('express').Router();


const postCategory = (req, res) => {
    let { name, imageUrl} = req.body;
    name = name.toLowerCase();
    const data = {name, imageUrl};

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


router.post('/', postCategory);
router.get('/', getAllCategorys);

module.exports = router;
