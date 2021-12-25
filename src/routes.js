const router = require('express').Router();
const auth = require('./controllers/userController');
const recipes = require('./controllers/recipeController');
const category = require('./controllers/categoryController');

router.use('/users', auth);
router.use('/recipes', recipes);
router.use('/category', category);

module.exports = router;