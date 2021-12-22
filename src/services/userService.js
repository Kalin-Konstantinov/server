
const User = require('../models/User');

exports.register = ({name, email, password}) => User.create({name, email, password});