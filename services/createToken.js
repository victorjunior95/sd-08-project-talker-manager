// https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript
const crypto = require('crypto');

function createToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = createToken;
