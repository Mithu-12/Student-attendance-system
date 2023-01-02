const User = require('../models/User');
const jwt = require('jsonwebtoken');
async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Invalid authorization' });
    }
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, 'secret-key');
    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(401).json({ message: 'user   Unauthorized' });
    }
    // console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
}
module.exports = authenticate;
