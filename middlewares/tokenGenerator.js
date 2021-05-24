const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

// refs:
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details#8532436

const tokenGenerator = (req, _res, next) => {
  let token = '';
  for (let i = 0; i < 16; i += 1) {
    token += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  }

  req.headers['token'] = token;
  return next();
};

module.exports = tokenGenerator;
