const crypto = require('crypto');

module.exports = {
  create(_request, response) {
    try {
      return response.status(200).send({ token: crypto.randomBytes(8).toString('hex') });
    } catch (err) {
      return response.status(400).send(err);
    }
  },
};