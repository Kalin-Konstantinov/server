const router = require('express').Router();
const { register, findUserByEmail } = require('../services/userService');
const bcrypt = require('bcrypt');

const errorMessage = { message: `Invalid password or username.` }

const loginUser = (req, res) => {
    const { email, password } = req.body;
    findUserByEmail({ email })
        .then(user => {
            if (user == null) {
                throw errorMessage;
            }
            return Promise.all([bcrypt.compare(password, user.password), user])
        })
        .then(response => {
            const [passwordValidation, user] = response;
            if (!passwordValidation) {
                throw errorMessage;
            }
            res.json(user)
        })
        .catch(err => res.json({ err }))
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