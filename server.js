const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.post('/register', async (req, res, next) => {
  console.log(req.body);

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid Data' });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;

    await user.save();

    return res.status(201).json({ message: 'user created successfully', user });
  } catch (e) {
    next(e);
  }
});

// app.post('/login', async (req, res, next) => {
//   const {email, password} = req.body
//   try {
//     const user = await User.findOne({ email });
    
//     console.log('login', user);
//     if (!user) {
//       return res.status(404).json({ message: 'Invalid credential' });
//     }
//     const isMatchPassword = await bcrypt.compare(password, user.password);
//     if (!isMatchPassword) {
//       return res.status(404).json({ message: 'Invalid credential' });
//     }
//     delete user.password;
//     return res.status(200).json({ message: 'login successful', user });
//   } catch (e) {
//     next(e)
//   }
// });

app.post('/login', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: 'Invalid Credential' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid Credential' });
		}

		delete user._doc.password;
		return res.status(200).json({ message: 'Login Successful', user });
	} catch (e) {
		next(e);
	}
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'server error' });
});
app.get('/', (_req, res) => {
  res.json({ message: 'success' });
});

connectDB('mongodb://localhost:27017/attendance-db')
  .then(() => {
    console.log('database connected');
    app.listen(4000, () => {
      console.log('port listen on port 4000');
    });
  })
  .catch((err) => console.log(err));
