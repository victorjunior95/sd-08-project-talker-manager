// Token generator found at:
// https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-http-com-nodejs/8022a9b1-7548-4298-97ce-9acfa8986e66/exercicios/50e3d722-6c08-464c-9e98-ae1f9f3ffdb5/bonus/93498579-5b0f-40ea-a413-bf681aff3569?use_case=side_bar

const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;
