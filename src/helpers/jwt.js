const util = require('util');
const jwt = require('jsonwebtoken');

exports.sing = util.promisify(jwt.sign);

exports.verify = util.promisify(jwt.verify);
