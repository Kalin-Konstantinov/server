const router = require('express').Router();
const { register } = require('../services/userService')

const login = (req, res) => {
    res.json(req.headers);
}

const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    register({ name, email, password })
        .then(dbRes => {
            const _id = dbRes._id;
            const name = dbRes.name;
            const email = dbRes.email;
            res.json({ _id, name, email });
        })
        .catch(err => res.json({message: err.message}))

}

const logout = (req, res) => {
    res.json({ msg: 'loggedout' });

}

router.post('/login', login);
router.post('/register', registerUser);
router.post('/logout', logout);

module.exports = router;