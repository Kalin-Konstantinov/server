const router = require('express').Router();

const login = (req, res) => {
    res.json(req.headers);
}

const register = (req, res) => {
    res.json({msg: 'registred'});

}

const logout = (req, res) => {
    res.json({msg: 'loggedout'});

}

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

module.exports = router;