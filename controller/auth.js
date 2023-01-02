const {registerService, loginService} = require('../service/auth')

const registerController = async (req, res, next) => {
    console.log(req.body);
  
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Invalid Data' });
    }
    try {
      const user = registerService(name, email, password)
	  return res.status(201).json({ message: 'user created successfully', user });
    } catch (e) {
      next(e);
    }
  };

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const token = loginService(email, password);
	  return res.status(200).json({ message: 'Login Successful', token });
    } catch (e) {
      next(e);
    }
  };

module.exports = { registerController, loginController };
