const router = require('express').Router();
const bcrypt = require('bcrypt');

const { register, findUserByEmail } = require('../services/userService');
const { JWT_SECRET } = require('../constants');
const jwt = require('../helpers/jwt');

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
            const { _id, name, email } = user;
            const payload = {
                _id,
                name,
                email
            }
            return Promise.all([jwt.sing(payload, JWT_SECRET), payload])
        })
        .then(responese => {
            const [accessToken, payload] = responese;
            res.json({ ...payload, accessToken })
        })
        .catch(err => res.json({ err }))
}

const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    register({ name, email, password })
        .then(() => {
            loginUser(req, res);
        })
        .catch(err => res.json({ err }))

}

const logout = (req, res) => {
    res.json({ msg: 'loggedout' });

}

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logout);

module.exports = router;