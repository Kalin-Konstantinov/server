const router = require('express').Router();
const { register, findUserByEmail } = require('../services/userService');
const bcrypt = require('bcrypt');

const loginUser = (req, res) => {
    const { email, password } = req.body;
    findUserByEmail({ email })
        .then(user => {
            return Promise.all([bcrypt.compare(password, user?.password), user])
        })
        .then(response => {
            const [passwordValidation, user] = response;
            if (user == null || !passwordValidation) {
                throw new Error(`Invalid password or username.`)
            }
            res.json(user)
        })
        .catch(err => res.json({
            error: 403,
            message: err.message,
        }))
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
        .catch(err => res.json({ message: err.message }))

}

const logout = (req, res) => {
    res.json({ msg: 'loggedout' });

}

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logout);

module.exports = router;