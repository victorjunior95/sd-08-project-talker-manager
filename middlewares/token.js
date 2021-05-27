const randomstring = require('randomstring');

const token = ((_request, response) => {
  response.send({ token: randomstring.generate(16) });
});

module.exports = token;
