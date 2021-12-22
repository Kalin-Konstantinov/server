const router = require('express').Router();
const auth = require('./controllers/userController');

router.use('/users', auth);

module.exports = router;