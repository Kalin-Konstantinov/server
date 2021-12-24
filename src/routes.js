const router = require('express').Router();
const auth = require('./controllers/userController');
const recipes = require('./controllers/recipeController');

router.use('/users', auth);
router.use('/recipes', recipes);

module.exports = router;