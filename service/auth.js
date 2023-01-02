const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { findUserByProperty, createNewUser } = require('./user');
const error = require('../utils/customError');

const registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty('email', email);
  if (user) {
    throw error('something went wrong', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return createNewUser({ name, email, password: hash });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty('email', email);

  if (!user) {
    throw error('something went wrong', 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw error('something went wrong', 400);
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accountStatus: user.accountStatus,
  };

  return jwt.sign(payload, 'secret-key', { expiresIn: '2h' });
};
module.exports = { registerService, loginService };
