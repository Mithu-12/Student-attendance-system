const express = require('express');
const connectDB = require('./db');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(routes);

app.get('/', (_req, res) => {
  return res.json({ message: 'success' });
});

app.get('/private', authenticate, async (req, res) => {
  console.log('i am user', req.user);
  return res.status(200).json({ message: 'this is private route' });
});
app.get('/public', (_req, res) => {
  return res.status(200).json({ message: 'this is public route' });
});
app.use((err, req, res, next) => {
  const message = err.message ? err.message : 'server error';
  const status = err.status ? err.status : 500;
  return res.status(status).json({ message });
});

connectDB('mongodb://localhost:27017/attendance-db')
  .then(() => {
    console.log('database connected');
    app.listen(4000, () => {
      console.log('port listen on port 4000');
    });
  })
  .catch((err) => console.log(err));
