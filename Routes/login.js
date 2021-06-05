const crypto = require('crypto');
const emailMiddleware = require('../middlewares/validation/email');
const passwordMiddleware = require('../middlewares/validation/password');
const app = require('../utils/express');

app.post('/', emailMiddleware, passwordMiddleware, (req, res) => {
  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  const token = ((crypto.randomBytes(20).toString('hex'))).substring(0, 16);
  res.status(200);
  res.json({ token });
}); 

module.exports = app;