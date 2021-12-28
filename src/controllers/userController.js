const router = require('express').Router();
const bcrypt = require('bcrypt');

const { register, findUserByEmail, findUserByName } = require('../services/userService');
const { JWT_SECRET } = require('../constants');
const jwt = require('../helpers/jwt');
const { isAuthenticated } = require('../middlewares/authMiddlewares');

const errorMessage = { message: `Invalid password or username.`, err: 401 }

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
        .catch(err => {
            console.log(err);
            res.json(err)
        })
}

const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    register({ name, email, password })
        .then(() => {
            loginUser(req, res);
        })
        .catch(err => {
            const errProperty = Object.keys(err.keyValue)[0]
            const errName = err.keyValue[errProperty];
            res.json({ err: 401, message: `User with this ${errProperty}: ${errName} already exist` });
            console.log(err);
        })

}

const logoutUser = (req, res) => {
    const userToken = req.headers['x-authorization'];
    jwt.verify(userToken, JWT_SECRET)
        .then(() => {
            res.json({ status: 200, ok: true });
        })
        .catch(() => res.json({ status: 401, ok: false }));
}

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);

module.exports = router;